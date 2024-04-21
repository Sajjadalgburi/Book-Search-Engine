const User = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Defining resolvers for GraphQL queries
const resolvers = {
  Query: {
    // Resolver for fetching all users
    users: async () => {
      return await User.find(); // Finding all users
    },

    // Resolver for fetching a single user by their ID
    singleUser: async (parent, { userId }) => {
      return await User.findById(userId); // Finding a user by ID
    },

    // Resolver for fetching the current authenticated user
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }); // Finding the current user by their ID
      }

      throw AuthenticationError;
    },
  },

  Mutation: {
    // Resolver function for creating a new user
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      // Generate a JSON Web Token (JWT) for the newly created user
      const token = signToken(user);

      // Return the newly created user object and the JWT token
      return { user, token };
    },
  },
};

// Exporting the resolvers
module.exports = resolvers;
