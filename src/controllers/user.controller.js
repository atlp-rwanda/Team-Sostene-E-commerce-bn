import passport from 'passport';
import {
  redisClient,
  ForgortPasswordTemplate,
  sendEmailReset,
  configEmail,
} from '../helpers';
import {
  generateToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
} from '../utils';
import { userServices } from '../services';

const signUp = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user) => {
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ code: 500, error: err.message });
      }
      const body = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: user.role,
      };
      const token = generateToken(body);
      redisClient.setEx(req.user.id, 86400, token);
      res
        .status(201)
        .header('authenticate', token)
        .json({ code: 201, message: 'Account Created', token });
    });
  })(req, res, next);
};

const login = async (req, res, next) => {
  passport.authenticate(
    'login',
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(406).json({ code: 406, message: info.message });
        }
        const body = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
        const token = generateToken(body);
        redisClient.setEx(user.id, 86400, token);
        req.user = user;
        res
          .status(200)
          .header('authenticate', token)
          .json({
            Code: 200,
            Message: `Logged In Successfully as ${req.user.username} .`,
            token,
          });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};

const loginWithGoogle = async (req, res, next) => {
  let user;
  try {
    user = await userServices.getUserByEmail(req.user.email);
    if (!user) {
      const data = {
        username: req.user.email,
        email: req.user.email,
        password: 'null',
      };
      user = await userServices.createUser(data);
    }
    const body = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(body);
    redisClient.setEx(user.id, 86400, token);
    req.user = user;
    res
      .status(200)
      .header('authenticate', token)
      .json({
        Code: 200,
        Message: `Logged In Successfully as ${req.user.username} .`,
        token,
      });
  } catch (error) {
    return next(error);
  }
};

const logOut = async (req, res) => {
  try {
    await redisClient.del(req.user.id);
    res.status(200).json({ code: 200, message: 'Logged Out' });
  } catch (error) {
    res.status(400).json({ code: 400, error: 'User Not Found' });
  }
};

const disableUserAccount = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = await userServices.getUserById(userId);

    if (!currentUser) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'User not found',
      });
    }
    const user = await userServices.disableAccount(userId);
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'User Account Disabled',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: 'User with email does not exist!',
      });
    }
    const userEmail = { email, id: user.id };
    const token = generateForgetPasswordToken(userEmail);
    const resetPasswordContent = ForgortPasswordTemplate(token);
    sendEmailReset(
      configEmail({
        email,
        subject: 'E-commerce Reset Password',
        content: resetPasswordContent,
      })
    );
    return res.status(200).json({
      code: 200,
      message: 'Message  sent successfully!',
      token,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = decodeResetPasswordToken(token);
    req.user = payload;
    const { email } = req.user;
    try {
      await userServices.UpdatePassword(email, req.body.password).then(() =>
        res.status(200).json({
          code: 200,
          message: 'You have reset successful your password',
        })
      );
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Server error',
      });
    }
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid Token, please try again',
    });
  }
};

export default {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  logOut,
  disableUserAccount,
};
