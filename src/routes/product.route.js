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
import { CollectionNameSchema, addproductSchema } from '../utils';
import Upload from '../helpers/multer';

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

router.post(
  '/collection/:cid',
  Upload,
  validate(addproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isValidCollection,
  productControllers.addproduct
);

router.patch(
  '/update/:id',
  Upload,
  validate(addproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  productControllers.updateOnadd
);

export default router;
