import chalk from "chalk";
import { table } from "table";
import { SearchResponse } from "./api";
import { unemojify } from "node-emoji";
export function print(response: SearchResponse) {
  const header = ["repository", "description", "star", "stared by"].map((v) =>
    chalk.bold(v)
  );

  const nested = response.search.nodes[0].pullRequests.nodes.map((v) => {
    const user = v.author.login;
    return v.author.starredRepositories.nodes.map((r) => {
      return [
        chalk.underline(r.url),
        unemojify(r.description),
        emphasizeStarCount(r.stargazerCount),
        user,
      ];
    });
  });
  const config = {
    columns: {
      0: {
        width: 60,
      },
      1: {
        width: 60,
      },
    },
  };
  console.log(table([header, ...nested.flat()], config));
}

function emphasizeStarCount(star: number): string {
  if (star > 10000) {
    return chalk.green(star);
  }
  if (star > 1000) {
    return chalk.cyan(star);
  }
  return `${star}`;
}
