const isTokenIncluded = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return true;
  }
  return false;
};

const getAccessTokenFromHeader = (req) => {
  const { authorization } = req.headers;
  if (authorization) {
    const access_token = authorization.split(' ')[1];
    return access_token;
  } else {
    return null;
  }
};

module.exports = {
  isTokenIncluded,
  getAccessTokenFromHeader,
};
