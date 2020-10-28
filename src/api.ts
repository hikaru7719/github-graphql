import { GraphQLClient, gql } from "graphql-request";
import { conf } from "./config";

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `bearer ${conf.GITHUB_TOKEN}`,
  },
});

export type SearchResponse = {
  search: {
    nodes: Array<Repository>;
  };
};

type Repository = {
  nameWithOwner: string;
  description: string;
  stargazerCount: number;
  url: string;
  languages: {
    nodes: Array<{ name: string }>;
  };
  pullRequests: {
    nodes: Array<{ author: Author }>;
  };
};

type Author = {
  login: string;
  starredRepositories: {
    nodes: Array<Repository>;
  };
};

export async function search(name: string): Promise<SearchResponse> {
  const query = gql`
    query searchByName($name: String!) {
      search(query: $name, type: REPOSITORY, first: 1) {
        nodes {
          ... on Repository {
            nameWithOwner
            pullRequests(last: 10, states: MERGED) {
              nodes {
                author {
                  login
                  ... on User {
                    starredRepositories(last: 10) {
                      nodes {
                        nameWithOwner
                        description
                        stargazerCount
                        url
                        languages(first: 1) {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return client.request<SearchResponse>(query, { name });
}
