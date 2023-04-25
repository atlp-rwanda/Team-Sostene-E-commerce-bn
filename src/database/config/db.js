import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config.js';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const db = config[env];

const sequelize = new Sequelize(db.url, {
  dialect: process.env.DB_DIALECT,
  logging: false, // if you want logs
  dialectOptions: {
    connectTimeout: 80000, // set to 60 seconds
    ssl: Boolean(process.env.SSL),
  },
});

sequelize.authenticate();

export default sequelize;
