import { GraphQLClient, gql } from "graphql-request";
import { conf } from "./config";

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `bearer ${conf.GITHUB_TOKEN}`,
  },
});

export async function search(name: string) {
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
  const resp = await client.request(query, { name });
  return resp;
}
