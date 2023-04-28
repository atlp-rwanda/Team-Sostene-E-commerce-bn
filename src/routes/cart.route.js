import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { isAuthenticated, validateParams } from '../middleware';
import { cartController } from '../controllers';
import { asyncWrapper } from '../helpers';
import { uuidSchemas } from '../utils';

const router = Router();

router.use(cookieParser());

router.post(
  '/:pid',
  isAuthenticated,
  validateParams(uuidSchemas.getProductSchema),
  asyncWrapper(cartController.addToCart)
);

export default router;
