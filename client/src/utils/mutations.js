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

// Define a GraphQL mutation to authenticate and log in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    # Mutation operation to log in a user, taking email and password as arguments
    login(email: $email, password: $password) {
      # Return token and user profile information upon successful login
      token
      profile {
        _id
        name
      }
    }
  }
`;