import app from '../../index.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.should();

chai.use(chaiHttp);

describe('Testing the home route', () => {
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
