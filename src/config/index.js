// Here there will be config files

/**
 *
 *  the configs folder, which keeps all the configs needed for the application.
 *  For example, if the app connects to a database, the configuration for the
 *  database (like database name and username) can be put in a file like db.config.js.
 *
 */

const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
module.exports = { sequelize };

