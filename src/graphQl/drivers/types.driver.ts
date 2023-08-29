import gql from 'graphql-tag';

import { graphQLClient } from '@/lib/graphQLClient';

export const types = {
  get: ({ jwt }: { jwt: string }) => {
    const query = gql`
      query {
        types {
          data {
            attributes {
              name
            }
          }
        }
      }
    `;

    return graphQLClient({
      jwt: jwt,
      gql: query,
    });
  },
};
