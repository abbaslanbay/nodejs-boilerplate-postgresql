const User = require('./user.model');
const Token = require('./token.model');

const definitions = (sequelize, Sequelize) => {
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  /**User */
  db.User = User(sequelize);
  db.Token = Token(sequelize);

  return db;
};

module.exports = definitions;
