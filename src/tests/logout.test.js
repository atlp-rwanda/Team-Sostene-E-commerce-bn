import chai from 'chai';
import chaiHttp from 'chai-http';
import { userServices } from '../services';
import { userControllers } from '../controllers';

const { expect } = chai;
chai.use(chaiHttp);
describe('Testing the logout of existing user', function () {
  it('should return a 200 status code', async function () {
    const user = await userServices.getUserByEmail('testing@example.com');
    const req = {
      user: { id: user.id },
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
    await userControllers.logOut(req, res);
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
    await userControllers.logOut(req, res);
  });
});
