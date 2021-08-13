import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Film from './film';
import Photos from './photos';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/shahruz/ic-mumbai-one',
  cache: new InMemoryCache()
});

const Provider: React.FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

const InternetCamera = { Provider, ...Film, ...Photos };
export default InternetCamera;
