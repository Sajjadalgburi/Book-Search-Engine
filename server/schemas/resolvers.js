const User = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // Resolver for fetching all users
    users: async () => {
      return await User.find();
    },
    // Resolver for fetching a single user by their ID
    singleUser: async (parent, { userId }) => {
      return await User.findById(userId);
    },
    // Resolver for fetching the current authenticated user
    me: async (parent, args, context) => {
      // Check if user is authenticated
      if (context.user) {
        // If authenticated, return the current user
        return await User.findById(context.user._id);
      }
      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError('You are not authenticated');
    },
  },
  Mutation: {
    // Resolver function for creating a new user
    createUser: async (parent, { username, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ username, email, password });
      // Generate a JWT token for the newly created user
      const token = signToken(user);
      // Return the user object and the token
      return { user, token };
    },
    // Resolver function for user login
    login: async (parent, { email, password }) => {
      // Find the user by email in the database
      const user = await User.findOne({ email });
      // If user is not found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      // Check if the provided password is correct
      const correctPsw = await user.isCorrectPassword(password);
      // If password is incorrect, throw an AuthenticationError
      if (!correctPsw) {
        throw new AuthenticationError('Incorrect password');
      }
      // Generate a JWT token for the authenticated user
      const token = signToken(user);
      // Return the user object and the token
      return { user, token };
    },
    // Resolver function for saving a book to user's savedBooks array
    saveBook: async (parent, { userId, bookInput }, context) => {
      // Check if user is authenticated
      if (context.user) {
        // If authenticated, update the user document to add the book to savedBooks
        return await User.findOneAndUpdate(
          { _id: userId }, // Find user by userId
          { $addToSet: { savedBooks: bookInput } }, // Add bookInput object to savedBooks array
          { new: true, runValidators: true } // Return the modified user document
        );
      }
      // If user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('You must be logged in to save a book.');
    },
    // Resolver function for removing a book from user's savedBooks array
    removeBook: async (parent, { userId, bookId }, context) => {
      // Check if user is authenticated
      if (context.user) {
        // If authenticated, remove the specified book from the user's savedBooks array
        return await User.findOneAndUpdate(
          { _id: userId }, // Find user by userId
          { $pull: { savedBooks: { bookId } } }, // Remove book with specified bookId from savedBooks array
          { new: true } // Return the modified user document
        );
      }
      // If user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('You must be logged in to remove a book.');
    },
  },
};

// Export the resolvers
module.exports = resolvers;
