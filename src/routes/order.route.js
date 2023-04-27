import express from 'express';
import { isAuthenticated, checkPermission } from '../middleware';

import {
  getOrderStatus,
  updateOrderStatus,
  getOrderStatuses,
  getOrderStatusEvents,
} from '../controllers/order.controller';
import order from '../database/models/order.model';

const router = express.Router();

const ckeckOrderExist = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderData = await order.findByPk(orderId, {});
    if (!orderData) {
      return res.status(401).json({ message: 'This order does not exist' });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'UNknown error',
      error: error.message,
    });
  }
};

router.get('/status', isAuthenticated, getOrderStatus);
router.get('/', getOrderStatuses);
router.get('/sse', getOrderStatusEvents);
router.patch(
  '/:orderId',
  isAuthenticated,
  checkPermission('ADMIN'),
  ckeckOrderExist,
  updateOrderStatus
);

export default router;
