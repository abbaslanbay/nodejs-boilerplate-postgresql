const { version } = require('../../package.json');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(process.cwd(), `config.${process.env.NODE_ENV}.env`),
});
const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Nodejs Postgress API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/abbaslanbay/nodejs-boilerplate-postgresql/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `${process.env.DOMAIN}/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
