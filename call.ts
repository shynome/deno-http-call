const shell = Deno.env.get("SHELL") as string;

export class CallError extends Error {}

export interface CallResult {
  output: string;
  error: string;
  success: boolean;
  code: number;
}

export async function call(cmd: string, env: { [k: string]: string } = {}) {
  const { PWD: pwd = "" } = env;
  if (pwd == "") {
    throw new CallError("$PWD must be set");
  }
  if (!cmd) {
    throw new CallError("cmd must be set");
  }
  const proc = Deno.run({
    cmd: [shell, "-c", cmd],
    cwd: pwd,
    env: env,
    stderr: "piped",
    stdout: "piped",
  });
  const [output, errOutput] = await Promise.all([
    proc.output(),
    proc.stderrOutput(),
  ]).then((outputs) =>
    outputs.map((output) => new TextDecoder().decode(output))
  );
  const status = await proc.status(); // wait proc finished
  return {
    code: status.code,
    success: status.success,
    output: output,
    error: errOutput,
  } as CallResult;
}
