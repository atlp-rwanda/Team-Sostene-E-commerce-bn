import Jwt from 'jsonwebtoken';
import passport from 'passport';
import redisClient from '../helpers/redis.js';

const SignUp = async (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const body = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      };
      const token = Jwt.sign({ user: body }, process.env.JWT_SECRET);
      res.cookie('session_id', req.user.id);
      redisClient.set(body.id, token);
      res.status(201).json({ token });
    });
  })(req, res, next);
};

const Login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(406).json({ code: 406, message: info.message });
      }
      const body = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      const token = Jwt.sign({ user: body }, process.env.JWT_SECRET);
      res.cookie('session_id', user.id);
      redisClient.set(user.id, token);
      req.user = user;
      res.status(200).json({
        Message: `Logged In Successfully as ${req.user.username} .`,
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const logout = async (req, res) => {
  try {
    await redisClient.del(req.user.id);
    res.cookie('session_id', '', { maxAge: 1 });
    res.status(200).json({ message: 'LOGED OUT' });
  } catch (error) {
    res.status(400).json({ error: 'user not found' });
  }
};

export { SignUp, Login, logout };
