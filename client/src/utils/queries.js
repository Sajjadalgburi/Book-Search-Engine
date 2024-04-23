// Import the gql tag from the '@apollo/client' package
import { gql } from '@apollo/client';

// Define the GraphQL query using the gql tag
export const QUERY_USERS = gql`
  query allUsers {
    # Fetch the _id, username, and savedBooks fields for all users
    _id
    username
    savedBooks
  }
`;

// GraphQL query to fetch a single user by their userId
export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    # Fetching a single user by their userId
    singleUser(userId: $userId) {
      _id
      username
      savedBooks
    }
  }
`;

// Define a GraphQL query constant QUERY_ME
export const QUERY_ME = gql`
  # Define a GraphQL query named "me"
  query me {
    # Request fields for the currently authenticated user
    me {
      _id
      username
      savedBooks
    }
  }
`;
