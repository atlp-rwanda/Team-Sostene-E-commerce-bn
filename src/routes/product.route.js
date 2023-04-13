import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { asyncWrapper } from '../helpers';
import {
  checkPermission,
  isAuthenticated,
  isCollectionExists,
  isProductSeller,
  isValidCollection,
  validate,
  validateParams,
} from '../middleware';
import { productControllers, collectionItemControllers } from '../controllers';
import { CollectionNameSchema, addproductSchema, uuidSchemas } from '../utils';
import Upload from '../helpers/multer';

const router = Router();

router.use(cookieParser());

router.get('/search', productControllers.searchProducts);

router.get('/all', asyncWrapper(productControllers.listAllItems));

router.get(
  '/list-items/:cid',
  validateParams(uuidSchemas.collectionIdSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isValidCollection,
  asyncWrapper(productControllers.listItems)
);

router.get(
  '/:pid',
  validateParams(uuidSchemas.getProductSchema),
  asyncWrapper(productControllers.getSingleProduct)
);

router.delete(
  '/:cid/delete/:pid',
  isAuthenticated,
  checkPermission('SELLER'),
  validateParams(uuidSchemas.deleteProductSchema),
  isValidCollection,
  asyncWrapper(productControllers.deleteProduct)
);

router.post(
  '/create-collection',
  isAuthenticated,
  checkPermission('SELLER'),
  validate(CollectionNameSchema),
  isCollectionExists,
  asyncWrapper(productControllers.CreateCollection)
);

router.delete(
  '/:cid/delete',
  isAuthenticated,
  checkPermission('SELLER'),
  isValidCollection,
  asyncWrapper(productControllers.DeleteCollection)
);

router.patch(
  '/update/item/:id',
  Upload,
  validate(addproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isProductSeller,
  asyncWrapper(collectionItemControllers)
);

router.post(
  '/collection/:cid',
  Upload,
  validate(addproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isValidCollection,
  asyncWrapper(productControllers.addproduct)
);

router.patch(
  '/update/:id',
  Upload,
  validate(addproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isProductSeller,
  asyncWrapper(productControllers.updateOnadd)
);

export default router;
