import express from 'express';
import { roleControllers } from '../controllers';
import isAuthenticated from '../middleware/authentication/authentication';
import validateRole from '../utils/roleValidator';
import checkPermission from '../middleware/checkPermission.middleware';

const router = express.Router();
router.patch(
  '/:userId/role',
  isAuthenticated,
  checkPermission('ADMIN'),
  validateRole,
  roleControllers
);

export default router;
