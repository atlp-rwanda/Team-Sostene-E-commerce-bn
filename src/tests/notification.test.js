import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import server from '../index.js';
import notificationUtils from '../utils/notificationUtils.js';
import { redisClient } from '../helpers';
import { isValidAuthToken } from '../helpers/notifications';

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const { expect } = chai;

const userDetails = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};

describe('signup', function () {
  it('should send a notification email', async function () {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testuser',
    };
    const promise = notificationUtils.signup(userData);
    await expect(promise).to.be.fulfilled;
  });
});

describe('change Password', function () {
  it('should send a notification email', async function () {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testuser',
    };
    const promise = notificationUtils.changePassword(userData);
    await expect(promise).to.be.fulfilled;
  });
});

describe('Testing Notifications', function () {
  it('Should Get Notifications', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(server)
          .get('/notifications/all')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('should return an HTML page with the correct headers', async function () {
    chai
      .request(server)
      .post('/users/login')
      .send(userDetails)
      .end(async (err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        const result = await chai
          .request(server)
          .get(`/notifications/${token}`)
          .set('Accept', 'text/html')
          .set(
            'User-Agent',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
          );
        chai.expect(result).to.have.status(200);
        chai.expect(result).to.be.html;
        chai
          .expect(result)
          .to.have.header('content-type', 'text/html; charset=UTF-8');
      });
  });
});

describe('isValidAuthToken', function () {
  let redisGetStub;

  before(function () {
    redisGetStub = sinon.stub(redisClient, 'get');
  });

  after(function () {
    redisGetStub.restore();
  });

  it('should return false if no token is provided', async function () {
    const result = await isValidAuthToken();
    expect(result).to.be.false;
  });

  it('should return false if the token is invalid', async function () {
    redisGetStub.resolves(null);
    const result = await isValidAuthToken('invalid_token');
    expect(result).to.be.false;
  });
});
