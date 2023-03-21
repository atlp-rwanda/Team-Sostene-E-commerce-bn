import chai from 'chai';
import chaiHttp from 'chai-http';
import { logout } from '../../controllers/user.controller.js';
import redisClient from '../../helpers/redis';
import User from '../../models/user.model.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the logout of existing user', function () {
  let data;

  it('should return a 200 status code', async function () {
    data = await User.create({
      email: 'ishimwe100@example.com',
      username: 'ishimwe100',
      password: 'password123',
    });
    await redisClient.set(data.id, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    const req = {
      user: { id: data.id },
    };
    const res = {
      cookie: () => {},
      status(statusCode) {
        expect(statusCode).to.equal(200);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('message');
      },
    };
    await logout(req, res);
    await data.destroy();
  });
});

describe('Testing the logout of unexisting user', function () {
  it('should return a 400 status code and error message', async function () {
    const req = {
      user: { id: '2000' },
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(400);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await logout(req, res);
  });
});
