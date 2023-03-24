// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';
import errorMessage from '../utils/errormessage';

const SignUpSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages(errorMessage('Username')),
  email: Joi.string().email().required().messages(errorMessage('Email')),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
    )
    .messages(errorMessage('Password')), // password has both numbers and letters and is btn 6 and 30
});

export { SignUpSchema };
