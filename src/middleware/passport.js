import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const { hash, compare } = bcrypt;
passport.serializeUser(function (user, done) {
  console.log('serialized');
  console.log(user);
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log('deserialized');
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
          password: await hash(req.body.password, 10),
        };
        const user = await User.create(data);
        done(null, user.dataValues);
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          const field = error.fields.username ? 'username' : 'email';
          done(null, false, { message: `${field} already exists.` });
        } else {
          done(error);
        }
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
      const user = await User.findOne({ where: { email } });
      if (user) {
        const passCheck = await compare(password, user.password);
        if (passCheck) {
          return done(null, user, { message: 'Logged In Successfully' });
        }
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, false, { message: 'User not Found.' });
    }
  )
);
