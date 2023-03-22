/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import Sinon from 'sinon';
import server from '../../index.js';
import User from '../../models/user.model.js';
import sequelize from '../../database/config/db.js';
import { Login } from '../../controllers/user.controller.js';
import isAuthenticated from '../../middleware/authentication.js';

const { hash } = bcrypt;

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

const { expect } = chai;

describe('Testing User Login Routes Successfully', function () {
  let id;
  before(async function () {
    sequelize.sync();
    const password = await hash('Qwert@12345', 10);
    const testUser = {
      email: 'testing1030@mail.com',
      username: 'testing1030',
      password,
    };
    const user = await User.create(testUser);
    id = user.id;
  });
  after(async function () {
    const user = await User.findOne({ where: { username: 'testing1030' } });
    await User.destroy({ where: { id: user.dataValues.id } });
  });
  it('should Login a user and check protected route', async function () {
    const req = {
      body: { email: 'testing1030@mail.com', password: 'Qwert@12345' },
    };
    const res = {
      cookie: () => {},
      status: () => ({
        json: async (response) => {
          expect(response).to.have.property('Message');
        },
      }),
    };
    await Login(req, res);
    const request = {
      cookies: {
        session_id: id,
      },
    };
    const response = {
      status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json(data) {
        this.body = data;
      },
    };
    const next = () => {};
    await isAuthenticated(request, response, next);
    expect(res.body).to.equal(undefined);
  });
});

describe('Testing User Login Routes with Errors', function () {
  before(async function () {
    const password = await hash('Qwert@12345', 10);
    const testUser = {
      email: 'testing101@mail.com',
      username: 'testing101',
      password,
    };
    await User.create(testUser);
  });
  after(async function () {
    const user = await User.findOne({ where: { username: 'testing101' } });
    await User.destroy({ where: { id: user.dataValues.id } });
  });
  it('It Should Be Unauthorized Since there is no login', function (done) {
    chai
      .request(server)
      .get('/users/protected-route')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('No Login due to missing Field ', function (done) {
    const number = Math.floor(Math.random() * 100);
    const testUser = {
      username: `Test User${number} Created`,
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('Error');
        done();
      });
  });
  it('No Login Wrong Email ', function (done) {
    const testUserLogin = {
      email: 'halal@mail.com',
      password: 'Qwert@12345',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        done();
      });
  });
  it('No Login Wrong Password ', function (done) {
    const testUserLogin = {
      email: 'testing101@mail.com',
      password: 'Qwert@12345halal',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Password is incorrect');
        done();
      });
  });
});

describe('Testing User Login Routes ', function () {
  before(async function () {
    const password = await hash('Qwert@12345', 10);
    const testUser = {
      email: 'testing1010@mail.com',
      username: 'testing1010',
      password,
    };
    await User.create(testUser);
  });
  after(async function () {
    const user = await User.findOne({ where: { username: 'testing1010' } });
    await User.destroy({ where: { id: user.dataValues.id } });
  });
  it('It Should Be Unauthorized Since there is no login', function (done) {
    chai
      .request(server)
      .get('/users/protected-route')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Login ', function (done) {
    const testUser = {
      email: `testing1010@mail.com`,
      password: 'Qwert@12345',
    };
    chai
      .request(server)
      .post('/users/login')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const idString = res.header['set-cookie'][0];
        const sessionString = idString.split(';')[0];
        const id = sessionString.split('=')[1];
        chai
          .request(server)
          .get('/users/protected-route')
          .set('Cookie', `session_id=${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        if (err) {
          console.log(err);
        }
      });
  });
});

describe('mocking login controller', function () {
  it('should handle errors correctly', async function () {
    const stub = Sinon.stub().throws(new Error('error message'));
    const error = await Login(stub);
    // expect.fail('function should have thrown an error');
    expect(error);
  });
});
