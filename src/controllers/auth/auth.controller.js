const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');
const { authService, tokenService } = require('../../services');

/**
 * Body
 * @param {string} req.body.first_name
 * @param {string} req.body.last_name
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {string} req.body.password_again
 */
const signUp = catchAsync(async (req, res) => {
  const createUser = await authService.signUp(req.body, res);
  if (!createUser) throw new ApiError(httpStatus.BAD_REQUEST, res.__('something_wrong'));
  const data = {
    user: createUser,
  };
  res.status(httpStatus.CREATED).send({ message: res.__('userCreated'), data: data });
});
/**
 * Body
 * @param {string} req.body.email
 * @param {string} req.body.password
 */
const signIn = catchAsync(async (req, res) => {
  const authUser = await authService.signIn(req.body, res);
  if (!authUser) throw new ApiError(httpStatus.BAD_REQUEST, res.__('something_wrong'));
  const tokens = await tokenService.generateAuthTokens(authUser);
  const data = {
    ...tokens,
    user: authUser,
  };
  res.status(httpStatus.OK).send({ message: res.__('userSignin'), data: data });
});

const getUser = catchAsync(async (req, res) => {
  const user = req.user;
  res.status(httpStatus.OK).send({ message: res.__('userFound'), data: user });
});

module.exports = {
  signUp,
  signIn,
  getUser,
};
