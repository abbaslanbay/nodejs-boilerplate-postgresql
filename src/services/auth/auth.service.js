const httpStatus = require('http-status');

const signUp = async (req, res) => {
  return res.status(httpStatus.OK).json({ message: 'Sign up successfully' });
};

const signIn = async (req, res) => {
  return res.status(httpStatus.OK).json({ message: 'Sign in successfully' });
};

module.exports = {
  signUp,
  signIn,
};
