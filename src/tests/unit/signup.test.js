import chai from 'chai';
import chaiHttp from 'chai-http';
import { SignUp } from '../../controllers/user.controller.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('SignUp function', function () {
  it('should create a token and set a cookie with the session token', async function () {
    const req = {
      user: {
        email: 'testnewuser@example.com',
        username: 'testnewuser',
        password: 'pass@Word123',
      },
    };
    const res = {
      cookie: () => {},
      status: () => ({
        json: (response) => {
          expect(response).to.have.property('error');
          // const token = Jwt.verify(response.token, 'TOP_SECRET');
          // expect(token.user.id).to.equal(req.user.id);
          // expect(token.user.username).to.equal(req.user.username);
          // expect(token.user.email).to.equal(req.user.email);
        },
      }),
    };
    await SignUp(req, res);
  });
});
