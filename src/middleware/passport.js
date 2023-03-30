import passport from 'passport';
import LocalStrategy from 'passport-local';
import { hashPassword, comparePassword } from '../utils/password.js';
import userServices from '../services';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = {
          email: email.trim(),
          username: req.body.username,
          password: await hashPassword(password),
        };
        const user = await userServices.createUser(data);
        done(null, user.dataValues);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await userServices.getUserByEmail(email);
      if (user) {
        const passCheck = await comparePassword(password, user.password);
        if (passCheck) {
          return done(null, user, { message: 'Logged In Successfully' });
        }
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, false, { message: 'User not Found.' });
    }
  )
);
