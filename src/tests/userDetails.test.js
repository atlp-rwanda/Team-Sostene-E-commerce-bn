import chai from 'chai';
import { v4 as uuidv4 } from 'uuid';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { generateToken, hashPassword } from '../utils/index';
import sequelize from '../database/config/db';
import { userServices, userProfileServices } from '../services';
import redisClient from '../helpers/redis.js';
import { isAuthenticated } from '../middleware/index.js';
import { asyncWrapper } from '../helpers/index.js';

const { expect } = chai;
chai.use(chaiHttp);

const userInfo = {
  email: 'testing@example.com',
  password: 'Qwert@12345',
};
const testuser1 = {
  id: '123',
  displayName: 'John Doe',
  email: 'johndoe@example.com',
};
const userProfiles = {
  gender: 'male',
  currency: 'USD',
  lang: 'en',
  dateOfBirth: '1990-01-01',
  placeOfLiving: 'New York',
  tel: '+12345678908',
  postalCode: '0000',
  accountNumber: '1234',
  accountName: 'Equity',
  country: 'Rwanda',
  streetAdress: 'kn109',
};
describe('User Details Controller', function () {
  let token;
  let user;
  before(async function () {
    user = await userServices.getUserByEmail(userInfo.email);
    const res = await chai.request(app).post('/users/login').send(userInfo);
    token = res.body.token;
  });

  after(async function () {
    await userProfileServices.deleteUserDetails(user.id);
    await userServices.deleteUser(user.id);
  });
  describe('POST /users/profile', function () {
    it('should create new user details when valid data is provided', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send(userProfiles);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
      expect(res.body).to.be.a('object');
    });
    it('should update user details that previously added)', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          ...userProfiles,
          gender: 'female',
          currency: 'RWF',
          lang: 'Kiny',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
      expect(res.body).to.be.a('object');
    });
    it('should update previous details that update nothing)', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
      expect(res.body).to.be.a('object');
    });
    it('should update user details if some optional data are not there)', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          gender: 'male',
          currency: 'USD',
          lang: 'en',
          dateOfBirth: '1990-01-01',
          placeOfLiving: 'New York',
          tel: '+12345678908',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should return 400, when user is logged in with invalid token', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ass${token}` })
        .send(userProfiles);
      expect(res).to.have.status(400);
    });
    it('should return 401, when user is not logged in', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .send(userProfiles);
      expect(res).to.have.status(401);
    });
    it('should return 406, when disobey the schema', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ ...userProfiles, gender: 'M' });
      expect(res).to.have.status(406);
    });

    it('should return 406 Bad Request, when updating user details with null params ', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          ...userProfiles,
          gender: '',
          currency: '',
        });
      expect(res).to.have.status(406);
      expect(res.body).to.have.property('error');
      const resDel = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: 'Bearer 321910398420cwdweded2qd2dw' })
        .send(userProfiles);
      chai.expect(resDel).to.have.status(400);
    });
  });
  let newUser;
  let newToken;
  let newUserId;
  describe('User Details check for different user', function () {
    const otherUserProfiles = {
      gender: 'female',
      currency: 'RWf',
      lang: 'Italian',
      dateOfBirth: '2000-01-01',
      placeOfLiving: 'York',
      tel: '3456789089',
      postalCode: '0000',
      accountNumber: '123384',
      accountName: 'small tet',
      country: 'Burundi',
      streetAdress: 'KN 102',
    };
    before(async function () {
      await sequelize.getQueryInterface().bulkInsert(
        'users',
        [
          {
            id: uuidv4(),
            username: 'testaxxtesting',
            email: 'testaxx@testing.com',
            password: await hashPassword('Qwert@12345'),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      newUser = await userServices.getUserByEmail('testaxx@testing.com');
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
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send(otherUserProfiles);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should Update user Details obeying the model', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          ...otherUserProfiles,
          lang: 'test lang',
          tel: '+470899889000',
          postalCode: '0000',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should return 400, when user is logged in with invalid token', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer as${newToken}` })
        .send(otherUserProfiles);
      expect(res).to.have.status(400);
    });
    it('should return 401, when user is not logged in', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .send(otherUserProfiles);
      expect(res).to.have.status(401);
    });
    it('should Update user with null params if allowing null', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          gender: 'male',
          currency: 'USD',
          lang: 'test lang',
          dateOfBirth: '1990-01-01',
          placeOfLiving: 'New York',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Successfully updated');
    });
    it('should return 406, when disobey the schema', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({ ...otherUserProfiles, gender: 'M' });
      expect(res).to.have.status(406);
    });
    it('should return 406 Bad Request, when updating user details with null params ', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send({
          ...otherUserProfiles,
          gender: '',
          lang: '',
          tel: '',
          streetAdress: '',
        });
      expect(res).to.have.status(406);
      expect(res.body).to.have.property('error');
    });
    it('should not pass the authentication test because the tokens do not match', async function () {
      const testToken = generateToken(testuser1);
      redisClient.setEx(testuser1.id, 86400, 'token');
      const req = {
        headers: {
          authorization: `Bearer ${testToken}`,
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
      await isAuthenticated(req, res);
    });
    it('should return 500, when user creadentials has been added by an other user ', async function () {
      const res = await chai
        .request(app)
        .post(`/users/profile`)
        .set({ Authorization: `Bearer ${newToken}` })
        .send(userProfiles);
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('message', 'Internal Server Error');
      expect(res.body).to.be.a('object');
    });
    describe('Throw 500 error, when server is down', function () {
      it('Should return error 500', async function () {
        const req = {};
        const res = {
          status: (statusCode) => ({
            json: (response) => {
              expect(statusCode).to.equal(500);
              expect(response.message).to.equal('Internal Server Error');
            },
          }),
        };
        await asyncWrapper(() => {
          throw error;
        })(req, res);
      });
    });
    after(async function () {
      await userProfileServices.deleteUserDetails(newUserId);
      await userServices.deleteUser(newUserId);
    });
  });
});
