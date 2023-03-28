/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import server from '../index.js';
import userServices from '../services/user.services';
import userController from '../controllers/user.controller.js';

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
    await userServices.createUser(testUser);
  });
  after(async function () {
    const user = await userServices.getUserByUsername('testish111');
    await userServices.deleteUser(user.id);
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

describe('Testing Signup Route with wrong credentials format', function () {
  it('should not sign up user because the email has a wrong format ', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'ishimwe999mail.com',
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
    chai.expect(response).to.have.status(406);
  });
  it('should not sign up user because the username has a wrong format ', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'ishimwe999mail.com',
      username: 'ish',
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
    chai.expect(response).to.have.status(406);
  });
  it('should not sign up user because the password has a wrong format ', async function () {
    // Create a user with a unique ID
    const user = {
      email: 'ishimwe999mail.com',
      username: 'ishimwe999',
      password: 'Qwertyazerty',
    };
    // Log in as the user and get the session ID
    const agent = chai.request.agent(server);
    const response = await agent.post('/users/signup').send({
      email: user.email,
      username: user.username,
      password: user.password,
    });
    // // Expect the response to have a status code of 201 and token
    chai.expect(response).to.have.status(406);
  });
});

describe('Testing Signup Route successfully', function () {
  after(async function () {
    const user = await userServices.getUserByUsername('ishimwe999');
    await userServices.deleteUser(user.id);
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

describe('signUp function', function () {
  it('should return a 500 status code if authentication fails', async function () {
    const req = {
      body: { username: 'testuser', password: 'testpassword' },
    };
    const res = {
      status(statusCode) {
        chai.expect(statusCode).to.equal(500);
        return this;
      },
      json(data) {
        chai.expect(data).to.have.property('error');
      },
    };
    const next = function (err) {
      err(new Error('Authentication failed'));
    };
    // await signUp(req, res, next);
    await userController.signUp(req, res, next);
  });
});
