/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import '../middleware/passport.js';
import { LoginSchema, SignUpSchema } from '../models/validationSchema.js';
import validate from '../middleware/validation';
import { SignUp, Login, logout } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/authentication.js';

const router = Router();
dotenv.config();

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({ secret: 'TOP_SECRET' }));
router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', validate(SignUpSchema), SignUp);

router.get('/protected-route', isAuthenticated, (req, res) => {
  res.status(200).json({ message: `Logged In as ${req.user.email}` });
});

router.post('/login', validate(LoginSchema), Login);
router.post('/logout', isAuthenticated, logout);

router.get('/', (req, res) => {
  res.status(200).json('Hello users!');
});

export default router;
