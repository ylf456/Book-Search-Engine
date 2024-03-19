const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // setting data to context.user   ,if logged in. 
      console.log("req.user from auth.js",req.user)
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};


/*
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const secret = 'mysecretsshhhhh';
const expiration = '2h';
module.exports = {
AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({req}) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization && token.startsWith('Bearer ')) { // Corrected token extraction
      token = token.slice(7); // Removed Bearer from token string
    }
    if (!token) {
      return { user: null }; // Changed return value to handle no token
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

*/