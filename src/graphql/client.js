import { ApolloClient, InMemoryCache } from "@apollo/client";
import {relayStylePagination} from "@apollo/client/utilities";
const { createUploadLink } = require('apollo-upload-client');

const client = new ApolloClient({
 link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
 cache: new InMemoryCache({
  typePolicies: {
   Query: {
    fields: {
     books: relayStylePagination(),
    },
   },
  },
 }),
 onError: ({ networkError, graphQLErrors }) => {
  console.log('graphQLErrors', graphQLErrors);
  console.log('networkError', networkError);
 },
});

export default client;
