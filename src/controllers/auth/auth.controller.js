const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');
const { authService } = require('../../services');

const signUp = catchAsync(async (req, res) => {
  const createUser = await authService.signUp(req.body);
  res.status(httpStatus.CREATED).send({ message: res.__('userCreated'), data: createUser });
});

const signIn = catchAsync(async (req, res) => {
  const authUser = await authService.signIn(req.body);

  res.status(httpStatus.OK).send({ message: res.__('userSignin'), data: authUser });
});

module.exports = {
  signUp,
  signIn,
};
