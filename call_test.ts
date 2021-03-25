import { call } from "./call.ts";
import { assertEquals } from "./dev_deps.ts";

Deno.test("call", async () => {
  const a = await call("cat call.ts", { PWD: Deno.cwd() });
  assertEquals(a.error, "");
  const b = await call("cat call2.ts", { PWD: Deno.cwd() });
  assertEquals(b.output, "");
});
