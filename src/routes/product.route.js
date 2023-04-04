import { Router } from 'express';
import cookieParser from 'cookie-parser';
import {
  checkPermission,
  isAuthenticated,
  isCollectionExists,
  isValidCollection,
  validate,
} from '../middleware';
import { productControllers } from '../controllers';
import { CollectionNameSchema } from '../utils';

const router = Router();

router.use(cookieParser());

router.post(
  '/create-collection',
  isAuthenticated,
  checkPermission('SELLER'),
  validate(CollectionNameSchema),
  isCollectionExists,
  productControllers.CreateCollection
);

router.delete(
  '/:cid/delete',
  isAuthenticated,
  checkPermission('SELLER'),
  isValidCollection,
  productControllers.DeleteCollection
);

export default router;
