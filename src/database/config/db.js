import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import config from './config.js';

dotenv.config();

const env = process.env.ENV || 'development';
const db = config[env];

const sequelize = new Sequelize(db.url, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate();

export default sequelize;
