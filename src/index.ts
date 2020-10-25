import { search } from "./api";

async function main() {
  const resp = await search("jest");
  console.log(JSON.stringify(resp));
}

main();
