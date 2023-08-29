import gql from 'graphql-tag';

import { graphQLClient } from '@/lib/graphQLClient';

import {productAttributesFragment} from '@/graphQl/fragments/product.fragment';

export const orders = {
  getOrders: ({ jwt }: { jwt: string }) => {
    const query = gql`
      ${productAttributesFragment}
      query {
        orders {
          data {
            id
            attributes {
              title
              description
              createdAt
              products {
                data {
                  id
                  attributes {
                    ...productAttributes
                  }
                }
              }
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
  deleteOrder: ({ id, jwt }: { id: string; jwt: string }) => {
    const mutation = gql`
      mutation deleteOrder($id: ID!) {
        deleteOrder(id: $id) {
          data {
            id
          }
        }
      }
    `;
    const variables = {
      id,
    };

    return graphQLClient({
      jwt: jwt,
      gql: mutation,
      variables,
    });
  },
};
