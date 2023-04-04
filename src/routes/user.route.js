import { Router } from 'express';
import '../middleware/passport';
import { userControllers } from '../controllers';
import checkUser from '../middleware/checkUser';
import { LoginSchema, SignUpSchema, PasswordSchema } from '../utils';
import {
  isAuthenticated,
  userEmailExists,
  userUsernameExists,
  validate,
  checkPermission,
} from '../middleware';

const router = Router();
router.post(
  '/signup',
  validate(SignUpSchema),
  userEmailExists,
  userUsernameExists,
  userControllers.signUp
);
router.get('/protected-route', isAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ code: 200, message: `Logged In as ${req.user.email}` });
});
router.post('/login', validate(LoginSchema), userControllers.login);
router.post('/logout', isAuthenticated, userControllers.logOut);

router.patch(
  '/disable/:id',
  isAuthenticated,
  checkPermission('ADMIN'),
  userControllers.disableUserAccount
);

router.post('/forgotPassword', checkUser, userControllers.forgotPassword);
router.put(
  '/reset-password/:token',
  validate(PasswordSchema),
  userControllers.resetPassword
);
router.get('/', (req, res) => {
  res.status(200).json('Hello users!');
});
export default router;
