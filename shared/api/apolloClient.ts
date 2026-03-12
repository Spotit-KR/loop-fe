import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { tokenStorage } from '../utils/token';

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: tokenStorage.get() ? `Bearer ${tokenStorage.get()}` : '',
  },
}));

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
