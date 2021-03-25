import * as JWT from "./jwt.ts";
import { start } from "./server.ts";

if (import.meta.main) {
  const args = Deno.args;
  switch (args[0]) {
    case "encode": {
      const token = await JWT.encode(args[1], args[2]);
      console.log(token);
      break;
    }
    case "decode":
      console.log(await JWT.decode(args[1]));
      break;
    case "start":
      start();
      break;
    default:
      console.log("添加 start 启动服务");
      break;
  }
}
