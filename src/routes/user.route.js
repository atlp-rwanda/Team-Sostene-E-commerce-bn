import { Router } from 'express';
import dotenv from 'dotenv';
import '../middleware/passport';
import { LoginSchema, SignUpSchema, UserDetailsSchema } from '../utils';
import userControllers from '../controllers';
import userDetails from '../controllers/userDetails';
import {
  isAuthenticated,
  userEmailExists,
  userUsernameExists,
  validate,
} from '../middleware';

const router = Router();
dotenv.config();

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
router.post(
  '/settings/:id',
  isAuthenticated,
  validate(UserDetailsSchema),
  userDetails
);

export default router;
