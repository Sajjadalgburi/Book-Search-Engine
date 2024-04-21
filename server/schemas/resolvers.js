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

    login: async (parent, { email, password }) => {
      // Find the user in the database using the provided email
      const user = await User.findOne({ email });

      // If user is not found, throw an AuthenticationError
      if (!user) {
        throw AuthenticationError;
      }

      // Check if the provided password is correct
      const correctPsw = await User.isCorrectPassword(password);

      // If password is incorrect, throw an AuthenticationError
      if (!correctPsw) {
        throw AuthenticationError;
      }

      // Generate a JSON Web Token (JWT) for the authenticated user
      const token = signToken(user);

      // Return the user and the generated token
      return { user, signToken };
    },
  },

  saveBook: async (parent, { userId, title }, context) => {
    // Check if user is authenticated
    if (context.user) {
      // If authenticated, update user document to add the book to saved books
      return User.findOneAndUpdate(
        { _id: userId }, // Find user by userId
        {
          $addToSet: { saveBooks: title }, // Add book title to savedBooks array if not already present
        },
        {
          new: true, // Return the modified user document
          runValidators: true, // Validate the update operation against the schema
        }
      );
    }

    // If user is not authenticated, throw AuthenticationError
    throw AuthenticationError;
  },
};

// Exporting the resolvers
module.exports = resolvers;
