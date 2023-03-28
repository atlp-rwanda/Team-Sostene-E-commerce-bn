import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import assert from 'assert';
import path from 'path';
import Jwt from 'jsonwebtoken';
import Sinon from 'sinon';
import passport from 'passport';
import { redisClient } from '../helpers';
import app from '../index';
import Products from '../database/models/products.model.js';
import Collection from '../database/models/collection.model';
import { productControllers } from '../controllers';
import { isCollectionExists } from '../middleware';
import productsService from '../services/products.service';

const { expect } = chai;
chai.use(chaiHttp);

const pathOne = path.join(__dirname, '..', 'assets', 'images', '1.jpg');
const pathTwo = path.join(__dirname, '..', 'assets', 'images', '2.jpg');
const pathThree = path.join(__dirname, '..', 'assets', 'images', '3.jpg');
const pathFour = path.join(__dirname, '..', 'assets', 'images', '4.jpg');
const file = path.join(__dirname, '..', 'assets', 'images', 'testFile.txt');

describe('adding product', function () {
  let token;
  let product;
  let data;
  let collectionID;

  before(async function () {
    data = await Collection.findOne({ where: { name: 'testing Collection' } });
    collectionID = data.id;
    const body = {
      id: data.userId,
      username: 'rock',
      role: 'SELLER',
    };
    token = Jwt.sign(body, process.env.JWT_SECRET);
    redisClient.set(body.id, token);
  });

  after(async function () {
    const find = await Products.findOne({ where: { name: 'testname' } });
    const images = await find.getProductImages();
    const promises = images.map(async (item) => {
      await productsService.deleteImage(item.url);
    });
    await Promise.all(promises);
    await Products.destroy({ where: { name: 'testname' } });
  });

  it('should add a new product', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/${collectionID}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('quantity', '1')
      .field('expDate', '2000-02-02')
      .field('bonus', '0')
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathTwo), '2.jpg')
      .attach('image', fs.readFileSync(pathThree), '3.jpg')
      .attach('image', fs.readFileSync(pathFour), '4.jpg');
    expect(response).to.have.status(200);
  });

  it('collection do not exists ', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/1a10c0fa-be02-45d9-8c39-3f78e993cd6b`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('bonus', '0');
    expect(response).to.have.status(404);
  });

  it('it should update if the product exists with single images ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const response = await chai
      .request(app)
      .patch(`/products/update/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('quantity', '1')
      .field('bonus', '0')
      .field('imageIndex', '0')
      .attach('image', fs.readFileSync(pathOne), '1.jpg');
    expect(response).to.have.status(200);
  });

  it('it should update if the product exists with multiple images ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const response = await chai
      .request(app)
      .patch(`/products/update/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('quantity', '1')
      .field('bonus', '0')
      .field('imageIndex', '0')
      .field('imageIndex', '1')
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathOne), '1.jpg');
    expect(response).to.have.status(200);
  });

  it('it should update if the product exists with no images ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const response = await chai
      .request(app)
      .patch(`/products/update/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('quantity', '1')
      .field('bonus', '0');
    expect(response).to.have.status(200);
  });

  it('product already exists', async function () {
    const req = {
      body: { productName: 'testname' },
      params: { cid: `${collectionID}` },
      files: [1, 2, 3, 4, 5],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(409);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('message');
      },
    };
    await productControllers.addproduct(req, res);
  });

  it('images less than 4 on update with deletion ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const req = {
      user: { id: `${data.userId}` },
      params: { id: `${product.id}` },
      body: { productName: 'ok', imageIndex: ['1', '2'] },
      files: [],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(401);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productControllers.updateOnadd(req, res);
  });

  it('images higher than 8 on update with no deletion ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const req = {
      user: { id: `${data.userId}` },
      params: { id: `${product.id}` },
      body: { productName: 'ok' },
      files: [1, 2, 3, 4, 5, 6],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(401);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productControllers.updateOnadd(req, res);
  });

  it('product not found', async function () {
    const req = {
      user: { id: `${data.userId}` },
      body: { productName: 'ok' },
      files: [1, 2, 3, 4, 5],
      params: { id: '1a1babd1-8afa-4cb7-9646-57e85d113972' },
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(404);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productControllers.updateOnadd(req, res);
  });

  it('should fail if the product is not for the seller', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const req = {
      user: { id: '438ff3ca-7b82-4ead-8deb-3dc46db253d1', username: 'test' },
      params: { id: product.id },
      body: { productName: 'ok' },
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
    await productControllers.updateOnadd(req, res);
  });

  it('unsupported file', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/${collectionID}`)
      .set('authorization', `Bearer ${token}`)
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('bonus', '0')
      .field('quantity', '1')
      .attach('image', fs.readFileSync(file), 'testfile.txt');
    expect(response).to.have.status(500);
  });
});

describe('catching error', function () {
  it('should catch error in case of invalid inputs on add', async function () {
    const req = {
      body: { productName: 'ok' },
      params: { cid: '0a43c0fa-be02-45d9-8c39' },
      files: [1, 2, 3, 4, 5],
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
        expect(statusCode).to.equal(400);
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
        expect(statusCode).to.equal(400);
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
