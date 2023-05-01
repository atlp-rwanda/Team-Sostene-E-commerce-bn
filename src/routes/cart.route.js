import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { isAuthenticated, validateParams } from '../middleware';
import { asyncWrapper } from '../helpers';
import { uuidSchemas } from '../utils';
import { cartControllers } from '../controllers';

const router = Router();

router.use(cookieParser());

router.post(
  '/:pid',
  isAuthenticated,
  validateParams(uuidSchemas.getProductSchema),
  asyncWrapper(cartControllers.addToCart)
);

router.get('/', isAuthenticated, asyncWrapper(cartControllers.viewCartItems));

export default router;
