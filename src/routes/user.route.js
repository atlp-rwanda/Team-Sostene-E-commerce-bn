/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import '../middleware/passport.js';
import { SignUpSchema } from '../models/validationSchema.js';
import validate from '../middleware/validation';
import SignUp from '../controllers/user.controller.js';
// import Jwt from 'jsonwebtoken';

const router = Router();
dotenv.config();

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({ secret: 'TOP_SECRET' }));
router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', validate(SignUpSchema), SignUp);
router.get('/', (req, res) => {
  res.status(200).json('Hello users!');
});

export default router;
