/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import server from '../index.js';
import User from '../database/models/user.model.js';

const { hash } = bcrypt;

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

describe('Testing Signup Route with errors', function () {
  before(async function () {
    const password = await hash('Qwert@12345', 10);
    const testUser = {
      email: 'testish111@mail.com',
      username: 'testish111',
      password,
    };
    await User.create(testUser);
  });
  after(async function () {
    const user = await User.findOne({ where: { username: 'testish111' } });
    await User.destroy({ where: { id: user.dataValues.id } });
  });
  it('should not signup successfully if email already exists', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'testish111@mail.com',
      username: 'testish112',
      password: 'Qwert@12345',
    };
    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent.post('/users/signup').send({
      email: user.email,
      username: user.username,
      password: user.password,
    });
    // // Expect the response to have a status code of 201 and token
    chai.expect(response).to.have.status(409);
    chai.expect(response.body).to.be.an('object');
  });
  it('should not signup successfully if username already exists', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'testish112@mail.com',
      username: 'testish111',
      password: 'Qwert@12345',
    };
    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent.post('/users/signup').send({
      email: user.email,
      username: user.username,
      password: user.password,
    });
    // // Expect the response to have a status code of 201 and token
    chai.expect(response).to.have.status(409);
    chai.expect(response.body).to.be.an('object');
  });
});

describe('Testing Signup Route successfully', function () {
  after(async function () {
    const user = await User.findOne({ where: { username: 'ishimwe999' } });
    await User.destroy({ where: { id: user.dataValues.id } });
  });
  it('should signup user successfully', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'ishimwe999@mail.com',
      username: 'ishimwe999',
      password: 'Qwert@12345',
    };
    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent.post('/users/signup').send({
      email: user.email,
      username: user.username,
      password: user.password,
    });
    // // Expect the response to have a status code of 201 and token
    chai.expect(response).to.have.status(201);
    chai.expect(response.body).to.be.an('object').to.have.property('token');
  });
});
