import { gql } from "apollo-server-express"
import getBooks from './resolvers/book.resolver'
import fileUpload from './resolvers/fileUpload.resolver';
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
export const typeDefs = gql`
 scalar any
 type Edge {
  cursor: String
  node: any
 }

 type PageInfo {
  startCursor: String
  endCursor: String
  hasNextPage: Boolean
  hasBackPage: Boolean
  action: String
 }

 type Response {
  edges: [Edge]
  pageInfo: PageInfo
 }
 scalar Upload
 type File {
  filename: String!
  mimetype: String!
  encoding: String!
 }

 type Query {
  books(first: Int, after: String): Response
 }
 type Mutation {
  # Multiple uploads are supported. See graphql-upload docs for details.
  singleUpload(file: Upload!): File!
 }

 schema {
  query: Query
  mutation: Mutation
 }
`;

export const resolvers = {
 Upload: GraphQLUpload,
 Query: {
  books: getBooks,
 },
 Mutation: {
  singleUpload: fileUpload,
 },
};
