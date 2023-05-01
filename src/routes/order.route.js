import express from 'express';
import {
  isAuthenticated,
  checkPermission,
  checkOrderExists,
} from '../middleware';
import {
  updateOrderStatus,
  getOrderStatusEvents,
  getOrdersByUser,
} from '../controllers/order.controller';
import { asyncWrapper } from '../helpers';

const router = express.Router();

router.get('/', isAuthenticated, getOrdersByUser);
router.get('/sse', getOrderStatusEvents);
router.patch(
  '/:orderId',
  isAuthenticated,
  checkPermission('ADMIN'),
  checkOrderExists,
  asyncWrapper(updateOrderStatus)
);

export default router;
