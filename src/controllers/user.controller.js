import Jwt from 'jsonwebtoken';
import passport from 'passport';

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
      const token = Jwt.sign({ user: body }, 'TOP_SECRET');
      res.cookie('session_token', token);
      res.status(201).json({ token });
    });
  })(req, res, next);
};
export default SignUp;
