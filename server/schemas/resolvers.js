const { User } = require("../models/index.js");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //   $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    getSingleUser: async (parent, args ,context) => {
      console.log(context.user._id);
      return await User.findOne({ _id: context.user._id }).populate('savedBooks');
    },
  },
  Mutation: {
    createUser: async (parent, { name, email, password }) => {
      const newUser = await User.create({ name, email, password });
      const token = signToken(newUser);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      console.log("login :resolver");
      console.log({email,password});

      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      console.log("user(data)",user)
      
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent,{ bookId, authors, title, description, image },context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id,},
          {
            $addToSet: {
              savedBooks: {
                authors: authors,
                description: description,
                bookId: bookId,
                image: image,
                title: title,
              },
            },
          },
          { new: true,}
        );
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id, },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true, }
        );
      }
    },
  },
};
/*
 const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));
*/
module.exports = resolvers;
