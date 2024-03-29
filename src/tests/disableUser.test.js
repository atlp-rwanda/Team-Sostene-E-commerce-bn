import chai from 'chai';
import chaiHttp from 'chai-http';
import { userServices } from '../services';
import app from '../index.js';
import { generateToken } from '../utils/token.js';
import { isAuthenticated } from '../middleware/index.js';

chai.should();
chai.use(chaiHttp);

const userDetails = {
  email: 'admin101@example.com',
  password: 'Qwert@12345',
};

const testUser = {
  email: 'testingdisable@example.com',
  password: 'Qwert@12345',
};

describe('Testing user status', function () {
  let user;
  before(async function () {
    user = await userServices.getUserByEmail(testUser.email);
  });
  it('should not disable user if not found', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch('/users/disable/d0bdf042-1412-4d12-888b-bcd631dac9b9')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
      });
  });
  it('should disable user ', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch(`/users/disable/${user.id}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            chai
              .request(app)
              .post('/users/login')
              .send({
                email: 'testingdisable@example.com',
                password: 'Qwert@12345',
              })
              .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                const testtoken = generateToken(testUser);
                const reques = {
                  headers: {
                    authorization: `Bearer ${testtoken}`,
                  },
                };
                const respon = {
                  status(statusCode) {
                    this.statusCode = statusCode;
                    expect(res).to.have.property('statusCode').to.equal(406);
                    return this;
                  },
                  json(data) {
                    this.body = data;
                  },
                };
                const next = () => {};

                isAuthenticated(reques, respon, next);
                chai
                  .request(app)
                  .patch(`/users/disable/${user.id}`)
                  .set({ Authorization: `Bearer ${token}` })
                  .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                  });
              });
          });
      });
  });
  it('should not disable user due to server error ', function (done) {
    chai
      .request(app)
      .post('/users/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        const { token } = res.body;
        chai
          .request(app)
          .patch('/users/disable/9c2f0aac-d04c-4de0-9530-fa0099339d0y')
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
