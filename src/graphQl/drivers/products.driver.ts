import gql from 'graphql-tag';

import { productAttributesFragment } from '@/graphQl/fragments/product.fragment';
import { graphQLClient } from '@/lib/graphQLClient';

export const products = {
  get: ({ jwt }: { jwt: string }) => {
    const query = gql`
      ${productAttributesFragment}
      query {
        products {
          data {
            id
            attributes {
              ...productAttributes
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
  getWithFilter: ({ jwt, eq }: { jwt: string; eq: string | undefined }) => {
    const query = gql`
      ${productAttributesFragment}
      query products($eq: String) {
        products(filters: { type: { name: { eq: $eq } } }) {
          data {
            id
            attributes {
              ...productAttributes
            }
          }
        }
      }
    `;
    const variables = {
      eq,
    };

    return graphQLClient({
      jwt: jwt,
      gql: query,
      variables,
    });
  },
  delete: ({ id, jwt }: { id: string; jwt: string }) => {
    const mutation = gql`
      mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id) {
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
