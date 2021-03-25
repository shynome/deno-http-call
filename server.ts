import { serve, ServerRequest } from "./deps.ts";
import { decode } from "./jwt.ts";
import { call, CallError, CallResult } from "./call.ts";

class ProcessedError extends Error {}

async function handle(req: ServerRequest) {
  const u = new URL(req.url, "http://127.0.0.1");
  const opts = await decode(u.pathname.slice(1)).catch(() => {
    req.respond({ status: 406, body: "错误的格式" });
    throw new ProcessedError();
  });
  const result = await call(opts.cmd, opts).catch((err) => {
    if (err instanceof CallError) {
      req.respond({ status: 400, body: err.message });
      throw new ProcessedError();
    }
    throw err;
  });
  if (result.error != "") {
    req.respond({ status: 500, body: result.error });
    return;
  }
  req.respond({ status: 200, body: result.output });
}

export async function start() {
  const server = serve({ port: 8080 });
  console.log("服务已启动 http://0.0.0.0:8080");
  for await (const req of server) {
    handle(req).catch((err) => {
      if (err instanceof ProcessedError) {
        return;
      }
      req.respond({ status: 500, body: "未知错误" });
      console.error(err);
    });
  }
}
