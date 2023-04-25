import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import Sinon from 'sinon';
import passport from 'passport';
import { isCollectionExists } from '../middleware';

chai.use(chaiHttp);

describe('catching error when adding and updating a product', function () {
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
