import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
 query books($first: Int, $after: String) {
  books(first: $first, after: $after) {
   pageInfo {
    startCursor
    endCursor
    hasNextPage
    hasBackPage
    action
   }
   edges {
    cursor
    node
   }
  }
 }
`;

export const File_Upload = gql`
 mutation ($file: Upload!) {
  singleUpload(file: $file) {
   filename
  }
 }
`;