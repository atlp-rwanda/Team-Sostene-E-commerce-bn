import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config.js';

dotenv.config();

const env = process.env.NODE_ENV;

const db = config[env];

const dbConfig = {
  dialect: process.env.DB_DIALECT,
  logging: false, // if you want logs
};

if (process.env.SSL === 'true') {
  dbConfig.dialectOptions = {
    connectTimeout: 80000, // set to 60 seconds
    logging: false,
    ssl: Boolean(process.env.SSL),
  };
}

const sequelize = new Sequelize(db.url, dbConfig);

sequelize.authenticate();

export default sequelize;
