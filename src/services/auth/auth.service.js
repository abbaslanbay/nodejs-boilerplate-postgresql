const httpStatus = require('http-status');
const { User } = require('../../models');
const ApiError = require('../../utils/ApiError');
const Encrypter = require('../../helper/encrypter');

const signUp = async (body, res) => {
  const { first_name, last_name, email, password, password_again } = body;
  const user = await checkUserByEmail(email);
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, res.__('email_already_exist'));
  }
  if (password !== password_again) {
    throw new ApiError(httpStatus.BAD_REQUEST, res.__('password_not_match'));
  }
  const pass = await Encrypter.password_enc(password);

  const createUser = await User.create({
    first_name,
    last_name,
    email,
    password: pass.encr,
    salt: pass.salt,
  });
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, res.__('something_wrong'));
  }
  return createUser;
};

const signIn = async (body, res) => {
  const { email, password } = body;
  const user = await checkUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, res.__('user_not_found'));
  }
  if (user.salt === null) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const pass = await Encrypter.password_dec(password, user.salt);
  if (pass !== user.password) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_password'));
  }
  user.is_login = true;
  await user.save();
  return user;
};

const checkUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  signUp,
  signIn,
};
