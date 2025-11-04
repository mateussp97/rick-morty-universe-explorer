import { GraphQLClient } from 'graphql-request';

const API_URL = 'https://rickandmortyapi.com/graphql';

export const graphqlClient = new GraphQLClient(API_URL);
