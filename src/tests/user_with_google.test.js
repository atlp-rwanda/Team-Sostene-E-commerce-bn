import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import passportStub from 'passport-stub';
import app from '../index.js';
import userControllers from '../controllers';
import { generateToken } from '../utils/token.js';
import redisClient from '../helpers/redis.js';
import { isAuthenticated } from '../middleware/index.js';

dotenv.config();

chai.should();

chai.use(chaiHttp);

describe('Testing login with google funcction ', function () {
  it('should return a token', async function () {
    const req = {
      user: {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
      },
    };

    const res = {
      cookie: () => {},
      status: async (response) => {
        expect(response).to.have.property('statusCode').to.equal(200);
      },
    };
    const next = () => {};

    await userControllers.loginWithGoogle(req, res, next);
  });
});

describe('Testing isauthenticated middleware ', function () {
  const testuser1 = {
    id: '123',
    displayName: 'John Doe',
    email: 'johndoe@example.com',
  };
  it('should pass the authentication check', async function () {
    const token = generateToken(testuser1);
    redisClient.setEx(testuser1.id, 86400, token);
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {
      status: () => {},
    };
    const next = () => {};

    await isAuthenticated(req, res, next);
  });
  it('should not pass the authentication test because the tokens do not match', async function () {
    const token = generateToken(testuser1);
    redisClient.setEx(testuser1.id, 86400, 'token');
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {
      status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json(data) {
        this.body = data;
      },
    };
    const next = () => {};

    await isAuthenticated(req, res, next);
  });
});

describe('Google Login API', function () {
  before(function () {
    passportStub.install(app);
  });

  after(function () {
    passportStub.uninstall(app);
  });

  it('should display the login with google link', function (done) {
    chai
      .request(app)
      .get('/users/login/google')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should redirect to the Google login page', function (done) {
    chai
      .request(app)
      .get('/auth/google')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.redirects[0]).to.have.string(
          'https://accounts.google.com/o/oauth2/v2/auth'
        );
        done();
      });
  });

  it('should redirect to login with google page after failed authentication', function (done) {
    chai
      .request(app)
      .get('/auth/google/callback?error=access_denied')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.redirects[0]).to.have.string('/auth/google');
        done();
      });
  });
});
