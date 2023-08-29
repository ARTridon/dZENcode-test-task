import { GraphQLClient, RequestOptions } from 'graphql-request';
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const graphQLClient = ({
  jwt,
  gql,
  variables,
}: {
  jwt?: string;
  gql: RequestOptions['document'];
  variables?: RequestOptions['variables'];
}) => {
  const headers: {
    'Content-Type': string;
    Accept: string;
    Authorization?: string;
  } = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  if (variables) {
    return new GraphQLClient(NEXT_PUBLIC_API_URL+'/graphql', {
      headers,
    }).request(gql, variables);
  }
  return new GraphQLClient(NEXT_PUBLIC_API_URL+'/graphql', {
    headers,
  }).request(gql);
};
