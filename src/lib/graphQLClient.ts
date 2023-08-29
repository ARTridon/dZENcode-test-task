import { GraphQLClient, RequestOptions } from 'graphql-request';

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
    return new GraphQLClient('http://127.0.0.1:1337/graphql', {
      headers,
    }).request(gql, variables);
  }
  return new GraphQLClient('http://127.0.0.1:1337/graphql', {
    headers,
  }).request(gql);
};
