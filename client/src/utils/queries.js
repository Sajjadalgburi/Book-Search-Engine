// Import the gql tag from the '@apollo/client' package
const gql = require('@apollo/client');

// Define the GraphQL query using the gql tag
export const QUERY_USERS = gql`
  query allUsers {
    // Fetch the _id, username, and savedBooks fields for all users
    _id
    username
    savedBooks
  }
`;
