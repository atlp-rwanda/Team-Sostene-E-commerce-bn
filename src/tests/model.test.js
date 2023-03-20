import { Sequelize } from 'sequelize';

const assert = require('assert');
const db = require('../database/models');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../database/config/config.js`)[env];

const { Usertest } = db;
const sequelize = new Sequelize(config.url);

// Define the table schema
// eslint-disable-next-line no-unused-vars
const UserSchema = sequelize.define('Usertest', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

describe('Usertest model', function () {
  beforeEach(async function () {
    // Reset database before each test
    await sequelize.sync({ force: true });
  });

  it('should create a user', async function () {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    const user = await Usertest.create(userData);
    assert.strictEqual(user.firstName, 'John');
    assert.strictEqual(user.lastName, 'Doe');
    assert.strictEqual(user.email, 'john.doe@example.com');
  });

  it('should update a user', async function () {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    const user = await Usertest.create(userData);
    const updatedUser = await user.update({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    });
    assert.strictEqual(updatedUser.firstName, 'Jane');
    assert.strictEqual(updatedUser.lastName, 'Doe');
    assert.strictEqual(updatedUser.email, 'jane.doe@example.com');
  });

  it('should delete a user', async function () {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    const user = await Usertest.create(userData);
    await user.destroy();
    const deletedUser = await Usertest.findByPk(user.id);
    assert.strictEqual(deletedUser, null);
  });
});
