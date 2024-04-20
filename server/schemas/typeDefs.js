const gql = require('graphql-tag');

const typeDefs = gql`
  type Users {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [String]!
  }


  type Query {
    users: [Users]!
    singleUser: (userId: ID!): Users
    me: Users
  }

  
  type Auth {
    token: ID!
    singleUser: Users
  }

`;

module.exports = typeDefs;
