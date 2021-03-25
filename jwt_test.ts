import { decode, encode } from "./jwt.ts";
import { assertEquals } from "./dev_deps.ts";

Deno.test("jwt", async () => {
  const pwd = "a";
  const cmd = "b";
  const token = await encode(pwd, cmd);
  const parsed = await decode(token);
  assertEquals(parsed.PWD, pwd);
  assertEquals(parsed.cmd, cmd);
});
