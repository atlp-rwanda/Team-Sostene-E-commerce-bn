import express from 'express';
import {
  isAuthenticated,
  checkPermission,
  checkOrderExists,
  validate,
} from '../middleware';
import {
  updateOrderStatus,
  getOrdersByUser,
  getOrderByUser,
} from '../controllers/order.controller';
import { asyncWrapper } from '../helpers';
import { orderStatusSchema } from '../utils';

const router = express.Router();

router.get('/', isAuthenticated, asyncWrapper(getOrdersByUser));
router.get('/:orderId', asyncWrapper(getOrderByUser));
router.patch(
  '/:orderId',
  isAuthenticated,
  checkPermission('ADMIN'),
  checkOrderExists,
  validate(orderStatusSchema),
  asyncWrapper(updateOrderStatus)
);

export default router;
