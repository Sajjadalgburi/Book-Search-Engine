const User = require('../models');
const { AuthenticationError } = require('../utils/auth');

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
};

// Exporting the resolvers
module.exports = resolvers;
