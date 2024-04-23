const gql = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    singleUser(userId: ID!): User
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookInput: BookInput!): User
    removeBook(userId: ID!, bookId: ID!): User
  }

  input BookInput {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }
`;

module.exports = typeDefs;
