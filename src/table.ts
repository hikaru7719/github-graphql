import chalk from "chalk";
import { table } from "table";
import { SearchResponse } from "./api";
import { conf } from "./config";

export function print(response: SearchResponse) {
  const header = ["url", "description", "star", "stared by"].map((v) =>
    chalk.bold(v)
  );
  const nested = response.search.nodes[0].pullRequests.nodes.map((v) => {
    const user = v.author.login;
    return v.author.starredRepositories.nodes.map((r) => {
      return [r.url, r.description, `${r.stargazerCount}`, user];
    });
  });
  const config = {
    columns: {
      0: {
        width: 20,
      },
    },
  };
  console.log(table([header, ...nested.flat()], config));
}
