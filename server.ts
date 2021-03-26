import { decode } from "./jwt.ts";
import { call, CallError } from "./call.ts";
import {
  Application,
  Context,
  Status,
} from "https://deno.land/x/oak@v6.5.0/mod.ts";

class ProcessedError extends Error {}

const respond = (ctx: Context, params: { status: Status; body: string }) => {
  ctx.response.status = params.status;
  ctx.response.body = params.body;
};

async function setEnv(ctx: Context, opts: { [k: string]: any }) {
  const env: { [k: string]: any } = {};
  if (ctx.request.hasBody) {
    const result = ctx.request.body();
    switch (result.type) {
      case "json": {
        const value = await result.value;
        for (let k in value) {
          value[k] = JSON.stringify(value[k]);
        }
        Object.assign(env, value);
        break;
      }
      case "form-data": {
        const value = await result.value.read();
        Object.assign(env, value.fields);
        break;
      }
      default:
        respond(ctx, { status: 406, body: "参数格式错误" });
        throw new ProcessedError();
    }
  }
  Object.assign(env, opts);
  return env;
}

async function handle(ctx: Context) {
  const opts = await decode(ctx.request.url.pathname.slice(1)).catch(() => {
    respond(ctx, { status: 406, body: "错误的格式" });
    throw new ProcessedError();
  });
  const env = await setEnv(ctx, opts);
  const result = await call(opts.cmd, env).catch((err) => {
    if (err instanceof CallError) {
      respond(ctx, { status: 400, body: err.message });
      throw new ProcessedError();
    }
    throw err;
  });
  if (result.error != "") {
    respond(ctx, { status: 500, body: result.error });
    return;
  }
  respond(ctx, { status: 200, body: result.output });
}

export async function start(port = 8080) {
  const app = new Application();
  app.use((ctx) => {
    return handle(ctx).catch((err) => {
      if (err instanceof ProcessedError) {
        return;
      }
      respond(ctx, { status: 500, body: "未知错误" });
      console.error(err);
    });
  });
  console.log("服务已启动 http://0.0.0.0:" + port);
  await app.listen({ port: port });
}
