// Import gql function from Apollo Client library
import { gql } from '@apollo/client';

// Define a GraphQL mutation to create a new user
export const CREATE_NEW_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    # Mutation operation to create a user, taking username, email, and password as arguments
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
      # Return token and user  information upon successful login
      token
      user {
        _id
        username
      }
    }
  }
`;

// Define a GraphQL mutation to save a book
export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: BookInput!) {
    saveBook(bookInput: $bookInput) {
      _id
      savedBooks {
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      savedBooks {
        bookId
      }
    }
  }
`;
