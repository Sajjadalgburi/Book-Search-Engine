// Import gql function from Apollo Client library
import { gql } from '@apollo/client';

// Define a GraphQL mutation to create a new user
export const CREATE_NEW_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    #Mutation operation to create a user, taking username, email, and password as arguments
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
