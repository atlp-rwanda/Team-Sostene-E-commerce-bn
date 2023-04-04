/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import cookieParser from 'cookie-parser';
import server from '../index.js';

chai.should();
chai.use(chaiHttp);
chai.use(cookieParser);

describe('Testing Create Collection and Deleting Collection', function () {
  const collectionDetails = {
    name: 'My collection',
  };
  const testUserLogin = {
    email: 'testingseller@example.com',
    password: 'Qwert@12345',
  };
  it(' Should create a Collection and delete collection ', function (done) {
    let cid;
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end(async (err, res) => {
        res.should.have.status(200);
        const token = res.body.token;
        await chai
          .request(server)
          .post('/products/create-collection')
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(201);
            cid = res.body.collection.id;
          });
        await chai
          .request(server)
          .post('/products/create-collection')
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(409);
          });
        await chai
          .request(server)
          .delete(`/products/${cid}/delete`)
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  it(' Should create not delete collection wich does not exist. ', function (done) {
    chai
      .request(server)
      .post('/users/login')
      .send(testUserLogin)
      .end(async (err, res) => {
        res.should.have.status(200);
        const token = res.body.token;
        await chai
          .request(server)
          .delete(`/products/e86c2276-35c0-4ace-b9d9-3bbf0f258014/delete`)
          .set({ Authorization: `Bearer ${token}` })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(404);
          });
        await chai
          .request(server)
          .delete(`/products/e86c2276-35c0-4ace-b9d9-3bbf0f258014/delete`)
          .set({ Authorization: 'Bearer 321910398420cwdweded2qd2dw' })
          .send(collectionDetails)
          .then(async (res) => {
            res.should.have.status(400);
            done();
          });
      });
  });
});
