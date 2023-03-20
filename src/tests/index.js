// This is where tests will be

// tip:
/**
 *
 * Here in tests folder is where all test files are.
 *
 */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index.js';

chai.should();

chai.use(chaiHttp);
describe('Testing the home route', function () {
  it('should get the content of home route', function (done) {
    chai
      .request(app)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

describe('Testing the home route', function () {
  it('should get the content of home route', function (done) {
    chai
      .request(app)
      .get('/test')
      .end((err, response) => {
        response.should.have.status(200);
        expect(response.body).to.be.a('object');
        done();
      });
  });
});
