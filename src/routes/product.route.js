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
  checkImg,
} from '../middleware';
import { productControllers, productImageController } from '../controllers';
import { CollectionNameSchema, productSchema, uuidSchemas } from '../utils';
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

router.post(
  '/collection/:cid',
  Upload,
  validate(productSchema.addproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isValidCollection,
  asyncWrapper(productControllers.addproduct)
);

router.patch(
  '/update/:id',
  Upload,
  validate(productSchema.updateproductSchema),
  isAuthenticated,
  checkPermission('SELLER'),
  isProductSeller,
  asyncWrapper(productControllers.updateOnadd)
);

router.patch(
  '/update/image/:id',
  Upload,
  validate(productSchema.addImage),
  isAuthenticated,
  checkPermission('SELLER'),
  isProductSeller,
  checkImg,
  productImageController.updtImages
);
export default router;
