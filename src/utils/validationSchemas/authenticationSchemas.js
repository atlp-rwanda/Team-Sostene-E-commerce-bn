import Joi from 'joi';
import errorMessage from '../errormessage.js';

const LoginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages(errorMessage('Email')),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
    )
    .messages(errorMessage('Password')), // password has both numbers and letters and is btn 6 and 30
});

const SignUpSchema = Joi.object().keys({
  username: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages(errorMessage('Username')),
  email: Joi.string().email().required().messages(errorMessage('Email')),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
    )
    .messages(errorMessage('Password')), // password has both numbers and letters and is btn 6 and 30
});

const CollectionNameSchema = Joi.object().keys({
  name: Joi.string().required().messages(errorMessage('Collection Name')),
});

const PasswordSchema = Joi.object().keys({
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
    )
    .messages(errorMessage('Password')), // password has both numbers and letters and is btn 6 and 30
});

export { LoginSchema, SignUpSchema, PasswordSchema, CollectionNameSchema };
