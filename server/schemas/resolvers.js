const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You are not authenticated');
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      console.log(username);
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { user, token };
      } catch (err) {
        console.log(err);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPsw = await user.isCorrectPassword(password);
      if (!correctPsw) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return { user, token };
    },
    saveBook: async (parent, { userId, bookInput }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You must be logged in to save a book.');
    },
    removeBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You must be logged in to remove a book.');
    },
  },
};

module.exports = resolvers;
