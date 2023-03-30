import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config.js';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const db = config[env];

// eslint-disable-next-line import/no-mutable-exports
let sequelize;
if (process.env.SSL === 'true') {
  sequelize = new Sequelize(db.url, {
    dialect: process.env.DB_DIALECT,
    logging: false, // if you want logs
    dialectOptions: {
      ssl: process.env.SSL,
    },
  });
} else {
  sequelize = new Sequelize(db.url, {
    dialect: process.env.DB_DIALECT,
    logging: false, // if you want logs
  });
}

sequelize.authenticate();

export default sequelize;
