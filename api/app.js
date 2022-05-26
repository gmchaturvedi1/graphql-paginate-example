import { ApolloServer } from "apollo-server-express";
import express from "express";
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
//const graphqlUploadExpress =require('graphql-upload/graphqlUploadExpress')
import { typeDefs, resolvers } from './schema.js';

const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true, uploads: false });
const app = express();
app.use(graphqlUploadExpress());

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen({ port }, () => {
  console.log(`Server listening at http://localhost:${port}${server.graphqlPath}`);
});