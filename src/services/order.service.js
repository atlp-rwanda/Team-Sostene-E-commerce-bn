import Order from '../database/models/order.model';
import User from '../database/models/user.model';

async function getOrdersByUser(userId) {
  const orders = await Order.findAll({ where: { userId } });
  return orders;
}

async function getOrderById(id) {
  const order = await Order.findOne({ where: { id } });
  return order;
}

async function updateOrderStatus(id, status) {
  const order = await Order.findOne({ where: { id } });
  order.status = status;
  order.statusUpdated = true;
  await order.save();
  return order;
}

async function getOrdersWithBuyerInfo() {
  const orders = await Order.findAll({
    where: {
      statusUpdated: true,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'role'],
        as: 'user',
      },
    ],
  });

  return orders;
}

export default {
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  getOrdersWithBuyerInfo,
};
