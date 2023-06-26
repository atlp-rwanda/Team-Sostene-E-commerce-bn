import express from 'express';
import { isAuthenticated, checkProductInStock, validate } from '../middleware';
import { shippingAddressSchema } from '../utils';
import { checkoutControllers } from '../controllers';
import { asyncWrapper } from '../helpers';

const router = express.Router();

router.post(
  '/checkout',
  isAuthenticated,
  checkProductInStock,
  asyncWrapper(checkoutControllers.checkout)
);

router.get(
  '/users/shipping-address',
  isAuthenticated,
  asyncWrapper(checkoutControllers.getShippingAddress)
);

router.post(
  '/users/shipping-address',
  isAuthenticated,
  validate(shippingAddressSchema),
  asyncWrapper(checkoutControllers.createShippingAddress)
);

router.patch(
  '/users/shipping-address',
  isAuthenticated,
  validate(shippingAddressSchema),
  asyncWrapper(checkoutControllers.updateShippingAddress)
);

export default router;
