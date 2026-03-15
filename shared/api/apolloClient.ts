import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { tokenStorage } from '../utils/token';

const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

if (!graphqlEndpoint || typeof graphqlEndpoint !== 'string') {
  console.error(
    '[Apollo] VITE_GRAPHQL_ENDPOINT가 설정되지 않았습니다. Vercel 환경변수에서 VITE_GRAPHQL_ENDPOINT를 확인하고, 설정 후 재배포하세요.'
  );
}

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: tokenStorage.get() ? `Bearer ${tokenStorage.get()}` : '',
  },
}));

const httpLink = new HttpLink({
  uri: graphqlEndpoint || '/graphql',
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
