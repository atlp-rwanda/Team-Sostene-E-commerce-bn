import isAuthenticated from './authentication/authentication';
import {
  userEmailExists,
  userUsernameExists,
} from './authentication/userExists';
import validate from './validation/validation';
import {
  isCollectionExists,
  isValidCollection,
} from './product/collectionExists';
import checkPermission from './checkPermission.middleware';
import errorHandler from './errorhandler.middleware';
import validateParams from './validation/paramValidation';
import isProductSeller from './product/productExists';

export {
  isAuthenticated,
  userEmailExists,
  userUsernameExists,
  validate,
  isCollectionExists,
  isValidCollection,
  checkPermission,
  errorHandler,
  validateParams,
  isProductSeller,
};
