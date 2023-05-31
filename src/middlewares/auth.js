const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { isTokenIncluded, getAccessTokenFromHeader } = require('../helper/auth');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authVerify = async (req, res, next) => {
  if (isTokenIncluded(req) === false) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token not included'));
  }
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));
    const checkUser = await User.findOne({
      attributes: ['id', 'uuid', 'email', 'first_name', 'last_name'],
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!checkUser) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));
    }
    if (checkUser.is_deleted === true) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));
    }

    req.user_id = decoded.user_id;
    req.user = checkUser;
    next();
  });
};

module.exports = {
  authVerify,
};
