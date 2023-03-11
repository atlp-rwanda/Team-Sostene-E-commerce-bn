const dotenv = require('dotenv');

dotenv.config();
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DIALECT,
} = process.env;

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT || 'postgres',
    port: process.env.POSTGRES_PORT,
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT || 'postgres',
    port: process.env.POSTGRES_PORT,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT || 'postgres',
    port: process.env.POSTGRES_PORT,
  },
};
