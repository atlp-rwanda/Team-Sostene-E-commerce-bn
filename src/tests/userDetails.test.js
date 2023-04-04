import chai from 'chai';
import { v4 as uuidv4 } from 'uuid';
import chaiHttp from 'chai-http';
import app from '../index.js';
import UserDetailsModel from '../database/models/userDetails.model.js';
import User from '../database/models/user.model.js';
import redisClient from '../helpers';
import { generateToken, hashPassword } from '../utils/index';
import isAuthenticated from '../middleware/authentication/authentication.js';
import sequelize from '../database/config/db';
import { userServices } from '../services';

const { expect } = chai;
chai.use(chaiHttp);

const userInfo = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};
describe('User Details Controller', function () {
  let newUser;
  let newToken;
  let newUserId;
  describe('User Details', function () {
    before(async function () {
      await sequelize.sync();
      await sequelize.getQueryInterface().bulkInsert(
        'users',
        [
          {
            id: uuidv4(),
            username: 'testaxtesting',
            email: 'testax@testing.com',
            password: await hashPassword('Qwert@12345'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      newUser = await userServices.getUserByEmail('testax@testing.com');

      newUserId = newUser.dataValues.id;
      const res = await chai.request(app).post('/users/login').send({
        email: newUser.dataValues.email,
        password: 'Qwert@12345',
      });
      newToken = res.body.token;
    });
    it('should create user details if not exists', async function () {
      const res = await chai
        .request(app)
        .post(`/users/settings/${newUserId}`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          gender: 'Female',
          currency: 'EUR',
          lang: 'French',
          dob: '1995-05-05',
          placeOfLiving: 'Paris',
          tel: '+987654321',
          accNo: '0987654321',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should Update user Details obeying the model', async function () {
      const res = await chai
        .request(app)
        .post(`/users/settings/${newUserId}`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          gender: 'Female',
          currency: 'EUR',
          lang: 'French',
          dob: '1995-05-05',
          placeOfLiving: 'Paris',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    after(async function () {
      await UserDetailsModel.destroy({ where: { userId: newUserId } });
      await User.destroy({ where: { id: newUserId } });
    });
  });
  let token;
  let user;
  before(async function () {
    user = await userServices.getUserByEmail(userInfo.email);
    const res = await chai.request(app).post('/users/login').send(userInfo);
    token = res.body.token;
  });

  after(async function () {
    await UserDetailsModel.destroy({ where: { userId: user.id } });
    await User.destroy({ where: { id: user.id } });
  });
  describe('POST /users/settings/:id', function () {
    it('should create new user details when valid data is provided', async function () {
      const res = await chai
        .request(app)
        .post(`/users/settings/${user.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          gender: 'Male',
          currency: 'USD',
          lang: 'en',
          dob: '1990-01-01',
          placeOfLiving: 'New York',
          tel: '1234567890',
          accNo: '1234',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should update user details that previously added)', async function () {
      const res = await chai
        .request(app)
        .post(`/users/settings/${user.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          gender: 'Male',
          currency: 'USD',
          lang: 'en',
          dob: '1990-01-01',
          placeOfLiving: 'New York',
          tel: '+1234567890',
          accNo: '123415632',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });

    it('should update user details if some optional data are not there)', async function () {
      const res = await chai
        .request(app)
        .post(`/users/settings/${user.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          gender: 'Male',
          currency: 'USD',
          lang: 'en',
          dob: '1990-01-01',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });

    it('should return 406 Bad Request, when updating user details with null params ', async function () {
      const res = await chai
        .request(app)
        .post(`/users/settings/${user.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          gender: '',
          currency: 'USD',
          lang: 'en',
          dob: '1990-01-01',
          placeOfLiving: '',
          tel: '',
          accNo: '',
        });
      expect(res).to.have.status(406);
      expect(res.body).to.have.property('error');
    });
  });

  describe('Testing Authentication middleware ', function () {
    const testuser = {
      id: '123',
      username: 'John Doe',
      email: 'johndoe@example.com',
    };
    it('should pass the authentication check', async function () {
      token = generateToken(testuser);
      redisClient.setEx(testuser.id, 86400, token);
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
    it("should fail when token ain't matching", async function () {
      token = generateToken(testuser);
      redisClient.setEx(testuser.id, 86400, 'token');
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
});
