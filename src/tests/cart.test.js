import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { cartServices } from '../services';
import { redisClient } from '../helpers';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('add items to their cart ', function () {
  const testUserLogin = {
    email: 'testing@example.com',
    password: 'Qwert@12345',
  };
  after(function () {
    redisClient.del('cart_353a6ac5-656f-402e-82b9-79997fb6a04e');
  });
  it('should Add item to their cart', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const response = await chai
      .request(app)
      .post(`/cart/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(201);
  });
  it('should Add item to their cart for secord time', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const response = await chai
      .request(app)
      .post(`/cart/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(201);
  });
  it('should Add item to their cart for third time', async function () {
    const res = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const { token } = res.body;
    const id = '0f1548b0-b7ce-49e3-a2ef-baffffd383ab';
    const response = await chai
      .request(app)
      .post(`/cart/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(201);
  });
  it('should Add Createcart', async function () {
    const cart = await cartServices.createCart(
      '8bf0b72d-ac1c-4abe-ae94-0ed65test'
    );
    expect(cart).to.deep.equal('OK');
  });
});
