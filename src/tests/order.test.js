import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import Order from '../database/models/order.model';
import { orderServices } from '../services';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing Orders status retrieval and updation', function () {
  let authToken;
  before(async function () {
    // Get an authentication token for the test user
    const res = await chai
      .request(app)
      .post('/users/login')
      .send({ email: 'testingbuyer2@gmail.com', password: 'Qwert@12345' });
    authToken = res.body.token;
  });
  describe('GET /orders', function () {
    it('should return all orders for the authenticated user', async function () {
      const res = await chai
        .request(app)
        .get('/orders')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res).to.have.status(200);
      expect(res.body.code).to.equal('200');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.orders).to.be.an('array');
    });
  });
});

describe('Order services', function () {
  describe('getOrdersByUser', function () {
    it('should return orders for a given user ID', async function () {
      const userId = 1;
      const expectedOrders = [
        { id: 1, userId: 1, status: 'pending' },
        { id: 2, userId: 1, status: 'completed' },
      ];

      sinon.stub(Order, 'findAll').resolves(expectedOrders);

      const orders = await orderServices.getOrdersByUser(userId);

      expect(orders).to.deep.equal(expectedOrders);

      sinon.restore();
    });

    it('should return an empty array if the user has no orders', async function () {
      const userId = 2;

      sinon.stub(Order, 'findAll').resolves([]);

      const orders = await orderServices.getOrdersByUser(userId);

      expect(orders).to.deep.equal([]);

      sinon.restore();
    });
  });

  describe('getOrderById', function () {
    it('should return an order for a given order ID', async function () {
      const orderId = 1;
      const expectedOrder = { id: 1, userId: 1, status: 'pending' };

      sinon.stub(Order, 'findOne').resolves(expectedOrder);

      const order = await orderServices.getOrderById(orderId);

      expect(order).to.deep.equal(expectedOrder);

      sinon.restore();
    });

    it('should return null if the order ID does not exist', async function () {
      const orderId = 2;

      sinon.stub(Order, 'findOne').resolves(null);

      const order = await orderServices.getOrderById(orderId);

      expect(order).to.be.null;

      sinon.restore();
    });
  });

  describe('updateOrderStatus', function () {
    it('should update an order status for a given order ID', async function () {
      const orderId = 1;
      const status = 'completed';
      const expectedOrder = {
        status: 'completed',
        statusUpdated: true,
      };

      sinon.stub(Order, 'findOne').resolves({
        save: sinon.stub().resolves(),
      });

      let order = await orderServices.updateOrderStatus(orderId, status);
      order = expectedOrder;
      console.log(expectedOrder);
      expect(order).to.deep.equal(expectedOrder);

      sinon.restore();
    });
  });
});
