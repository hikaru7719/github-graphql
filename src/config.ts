import { config } from "dotenv";

export function make() {
  config();
  return {
    GITHUB_TOKEN: validateEnv("GITHUB_TOKEN"),
  };
}

function validateEnv(name: string): string {
  const env = process.env[name];
  if (!env) {
    throw new Error(`can't find process.env.${name}`);
  }
  return env;
}

export const conf = make();
