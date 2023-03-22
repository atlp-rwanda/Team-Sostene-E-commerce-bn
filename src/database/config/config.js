import dotenv from 'dotenv';

dotenv.config();
const { DEV_DATABASE_URL, TEST_DATABASE_URL, DATABASE_URL } = process.env;

export default {
  development: {
    url: DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
  },
};
