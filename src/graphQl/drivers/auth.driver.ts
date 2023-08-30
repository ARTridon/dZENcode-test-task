import gql from 'graphql-tag';

import { graphQLClient } from '@/lib/graphQLClient';

export const auth = {
  login: ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => {
    const mutation = gql`
      mutation login(
        $identifier: String!
        $password: String!
        $provider: String!
      ) {
        login(
          input: {
            identifier: $identifier
            password: $password
            provider: $provider
          }
        ) {
          jwt

          user {
            id
            email
          }
        }
      }
    `;
    const variables = {
      identifier,
      password,
      provider: 'local',
    };

    return graphQLClient({
      gql: mutation,
      variables,
    });
  },
  getAvatar: ({ jwt, id }: { jwt: string; id: string }) => {
    const query = gql`
      query avatar($id: ID!) {
        usersPermissionsUser(id: $id) {
          data {
            attributes {
              avatar {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
    const variables = {
      id,
    };

    return graphQLClient({
      jwt: jwt,
      gql: query,
      variables,
    });
  },
};
