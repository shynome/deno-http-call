import Random from "https://deno.land/x/random@v1.1.2/Random.js";
import {
  AES,
  encode as encodeC,
} from "https://deno.land/x/god_crypto@v1.4.9/mod.ts";

const keyPath = ".call-key";

const key = Deno.env.get("CALL_KEY") ||
  await Deno.readTextFile(keyPath).catch(async (err) => {
    const secret = new Random().string(32);
    await Deno.writeTextFile(keyPath, secret);
    return secret;
  });

export async function encode(pwd: string, cmd: string) {
  const aes = new AES(key, { mode: "cbc" });
  const data = JSON.stringify({ PWD: pwd, cmd: cmd });
  const cipher = await aes.encrypt(data);
  return cipher.base64url() as string;
}

export async function decode(data: string) {
  const aes = new AES(key, { mode: "cbc" });
  const d2 = encodeC.base64url(data);
  const plain = await aes.decrypt(d2);
  const s = plain.toString();
  return JSON.parse(s) as { PWD: string; cmd: string };
}
