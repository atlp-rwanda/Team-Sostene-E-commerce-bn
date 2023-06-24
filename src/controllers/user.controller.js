import passport from 'passport';
import {
  redisClient,
  notificationTemplates,
  sendEmailReset,
  configEmail,
  asyncWrapper,
} from '../helpers';
import {
  generateToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
  decodeToken,
  hashPassword,
  notificationUtils,
} from '../utils';
import {
  userServices,
  notificationServices,
  userProfileServices,
} from '../services';

import twoFactorAuth from '../services/twofactor.service';
import verifyOldPassword from '../helpers/verifyPassword';

const signUp = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user) => {
    req.login(user, async () => {
      const body = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: user.role,
        status: user.status,
      };
      const dataprofiles = {
        userId: body.id,
        names: '',
        gender: '',
        birthdate: '2023-02-02',
        language: '',
        city: '',
        street: '',
        currency: '',
        postalCode: '',
        country: '',
        accountNumber: '',
        accountName: '',
        telephone: '',
      };
      await userProfileServices.createUserProfiles(dataprofiles);
      const token = generateToken(body);

      await notificationUtils.signup(req.user);
      notificationServices.sendNotification(
        req.user.id,
        'Account is created successfully',
        'User registration',
        'low'
      );

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
        const data = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        };
        if (user.status === 'INACTIVE') {
          return res
            .status(401)
            .json({ code: 401, message: 'Your account has been diactivated.' });
        }
        if (user.role === 'SELLER' && user.tfa_enabled === true) {
          return twoFactorAuth(res, user);
        }
        const token = generateToken(data);
        req.user = user;
        return res
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

const verifyOTP = asyncWrapper(async (req, res) => {
  const { verificationCode } = req.body;
  const { email } = req.params;
  const result = await redisClient.get(email, (err, data) => data);
  const redisOTP = result.split('=')[0];
  const redisToken = result.split('=')[1];
  if (redisOTP === verificationCode) {
    const user = decodeToken(redisToken);
    req.user = user;
    return res
      .status(200)
      .header('authenticate', redisToken)
      .json({
        code: 200,
        message: `Logged In Successfully as ${req.user.username} .`,
        token: redisToken,
      });
  }

  return res.status(406).header('authenticate', redisToken).json({
    code: 406,
    message: `Invalid Otp.`,
  });
});

const loginWithGoogle = async (req, res, next) => {
  if (req.body) {
    req.user = req.body.user;
  }
  let user;
  try {
    user = await userServices.getUserByEmail(req.user.email);
    if (!user) {
      const username = req.user.email.split('@')[0];
      const data = {
        username,
        email: req.user.email,
        password: 'null',
      };
      user = await userServices.createUser(data);
    }
    const body = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    const token = generateToken(body);
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
  const userId = req.params.id;
  const currentUser = await userServices.getUserById(userId);

  if (!currentUser) {
    return res.status(404).json({
      code: 404,
      message: 'User not found',
    });
  }
  return userServices.disableAccount(userId).then(() =>
    res.status(200).json({
      code: 200,
      message: 'User Status Changed',
    })
  );
};

const forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await userServices.getUserByEmail(email);
  if (!user) {
    return res.status(400).json({
      code: 400,
      message: 'User with email does not exist!',
    });
  }
  const userEmail = { email, id: user.id };
  const token = generateForgetPasswordToken(userEmail);
  const encodedToken = Buffer.from(token).toString('base64');
  const resetPasswordContent =
    notificationTemplates.ForgortPasswordTemplate(encodedToken);
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
  });
});
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const payload = decodeResetPasswordToken(decodedToken);
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
const changePassword = async (req, res, next) => {
  try {
    const user = await userServices.getUserById(req.user.id);
    // Verify that the old password matches
    const passwordMatches = await verifyOldPassword(
      user.dataValues.id,
      req.body.oldPassword
    );
    if (!passwordMatches) {
      return res.status(401).json({
        code: 401,
        message: 'Incorrect password',
      });
    }

    // Hash the new password and update the user in the database
    const { newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    // Save the updated user object
    await user.save();

    await notificationUtils.changePassword(req.user);
    notificationServices.sendNotification(
      req.user.id,
      'Password is changed successfully',
      'Password update',
      'low'
    );

    return res.status(200).json({
      code: 200,
      message: 'Password updated successfully',
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const findAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const users = await userServices.getAllUsers({ offset, limit });
  const totalCount = await userServices.getTotalUsersCount();

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
    code: 200,
    message: `Users for page ${page} are retrieved`,
    users,
    page,
    totalPages,
  });
};

export default {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  logOut,
  changePassword,
  disableUserAccount,
  verifyOTP,
  findAll,
};
