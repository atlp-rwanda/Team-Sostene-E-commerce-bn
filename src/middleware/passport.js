import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const { hash, compare } = bcrypt;
passport.serializeUser(function (user, done) {
  console.log('serialized');
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
      // const user = await User.findOne({ where: { email } });
      // if (user) {
      //   return done(null, false, { message: 'Email Already Exists' });
      // }

      // try {
      //   password = await hash(req.body.password, 10);
      //   const data = {
      //     email: email.trim(),
      //     username: req.body.username,
      //     password,
      //   };
      //   await User.create(data)
      //     .then((data) => done(null, data))
      //     .catch((err) => console.log(err));
      // } catch (error) {
      //   return done(error);
      // }
      try {
        const data = {
          email: email.trim(),
          username: req.body.username,
          password: await hash(req.body.password, 10),
        };
        await User.create(data);
        done(null, data);
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
