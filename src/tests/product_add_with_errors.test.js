import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import Sinon from 'sinon';
import passport from 'passport';
import { productControllers } from '../controllers';
import { isCollectionExists } from '../middleware';

const { expect } = chai;
chai.use(chaiHttp);

describe('catching error when adding and updating a product', function () {
  it('should catch error in case of invalid inputs on add', async function () {
    const req = {
      body: { productName: 'ok' },
      params: { cid: '0a43c0fa-be02-45d9-8c39' },
      files: [1, 2, 3, 4, 5],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(500);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productControllers.addproduct(req, res);
  });

  it('should catch error in case of invalid inputs on update', async function () {
    const req = {
      body: { category: 'shoes' },
      params: { id: '0a43c0fa-be02-45d9-8c39' },
      files: [1, 2, 3, 4, 5],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(500);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productControllers.updateOnadd(req, res);
  });

  it('images required not provided on add ', async function () {
    const req = {
      body: { productName: 'ok' },
      files: [1, 2, 3],
      params: '123',
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(500);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productControllers.addproduct(req, res);
  });

  it('should call next when the collection by name do not exist', async function () {
    const req = { body: { name: 'Test' } };
    const res = {
      status() {},
      json() {},
    };
    const next = Sinon.stub();
    await isCollectionExists(req, res, next);
    assert.ok(next.calledOnce);
  });

  it('should call deserializeUser function', async function (done) {
    const user = { id: 1, name: 'the test man' };
    passport.deserializeUser(user, function (err, deserializedUser) {
      assert.deepStrictEqual(deserializedUser, user);
      assert.strictEqual(err, null);
      done();
    });
  });
});
