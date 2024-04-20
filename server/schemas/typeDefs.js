const gql = require('graphql-tag');

// Defining the GraphQL schema using gql template literal
const typeDefs = gql`
  # Defining the 'Users' type with fields
  type Users {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [String]! # Array of strings representing saved books
  }

  # Defining the queries available in the schema
  type Query {
    users: [Users]! # Query to retrieve all users
    singleUser(userId: ID!): Users # Query to retrieve a single user by ID
    me: Users # Query to retrieve the authenticated user
  }

  # Defining the authentication response type
  type Auth {
    token: ID! # Authentication token
    singleUser: Users # The user associated with the authentication
  }
`;

// Exporting the GraphQL schema
module.exports = typeDefs;
