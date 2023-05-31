const express = require('express');

const router = express.Router();

const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

const userRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
];
userRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
