import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import '../middleware/passport.js';
import userControllers from '../controllers';

const userRouter = express.Router();

userRouter.use(cookieParser());
userRouter.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

userRouter.use(passport.initialize());
userRouter.use(passport.session());

userRouter.get('/users/login/google', (req, res) => {
  res
    .status(304)
    .send(
      `<a href="${process.env.PRODUCTION_URL}/auth/google/"/>Login with Google</a>`
    );
});

userRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
    successRedirect: '/auth/google/success',
  })
);

userRouter.get('/auth/google/success', userControllers.loginWithGoogle);

export default userRouter;
