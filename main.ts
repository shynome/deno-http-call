import * as JWT from "./jwt.ts";
import { start } from "./server.ts";

const args = Deno.args;
switch (args[0]) {
  case "crypt":
  case "encode": {
    const token = await JWT.crypt(args[1], args[2]);
    console.log(token);
    break;
  }
  case "decrypt":
  case "decode":
    console.log(await JWT.decrypt(args[1]));
    break;
  case "start": {
    const _port = args[1];
    let port = Number(Deno.env.get("PORT") || _port);
    if (isNaN(port) || port === 0) {
      port = 8080;
    }
    start(port);
    break;
  }
  default:
    console.log("添加 start 参数启动服务");
    break;
}
