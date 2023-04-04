import isAuthenticated from './authentication/authentication';
import {
  userEmailExists,
  userUsernameExists,
} from './authentication/userExists';

import validate from './validation/validation';
import checkPermission from './checkPermission.middleware';

export {
  isAuthenticated,
  userEmailExists,
  userUsernameExists,
  validate,
  checkPermission,
};
