import { search } from "./api";
import { print } from "./table";

async function main() {
  const resp = await search("TypeScript");
  print(resp);
}

main();
