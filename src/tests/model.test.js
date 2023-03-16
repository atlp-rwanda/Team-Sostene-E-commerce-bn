'use strict';

import { Sequelize ,Model, DataTypes } from 'sequelize';
import config from '../db/config/config';

const assert = require('assert');

const db = require('../db/models');
let Usertest = db.Usertest;
const sequelize = new Sequelize(config.development);

describe('Usertest model', () => {
  beforeEach(async () => {
    // Reset database before each test
    await sequelize.sync({ force: true });
  });

  it('should create a user', async () => {
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

  it('should update a user', async () => {
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

  it('should delete a user', async () => {
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
