import { search } from "./api";
import { print } from "./table";
import { Command } from "commander";

async function execute(target: string) {
  const result = await search(target);
  print(result);
}

const cmd = new Command("gq");
cmd.command("repo <target>").action(async (target: string) => {
  await execute(target);
});

cmd.parse(process.argv);
