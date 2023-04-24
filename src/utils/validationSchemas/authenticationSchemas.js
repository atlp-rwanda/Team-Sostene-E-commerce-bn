import Joi from 'joi';
import errorMessage from '../errormessage';

const usernameSchema = Joi.string()
  .min(6)
  .max(30)
  .required()
  .messages(errorMessage('Username'));

const emailSchema = Joi.string()
  .email()
  .required()
  .messages(errorMessage('Email'));

const passwordSchema = Joi.string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{8,}$/
  )
  .messages(errorMessage('Password'));

const LoginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const SignUpSchema = Joi.object().keys({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
const UserDetailsSchema = Joi.object().keys({
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .messages(errorMessage('Gender')),
  dateOfBirth: Joi.date().messages(errorMessage('Date')),
  currency: Joi.string(),
  lang: Joi.string().max(255).messages(errorMessage('Prefered Language')),
  tel: Joi.string()
    .regex(/^\+?\d{10,15}$/)
    .messages(errorMessage('Telephone Number')),
  accountNumber: Joi.string()
    .regex(/^([0-9]{1,20})$/)
    .messages(errorMessage('Account Number')),
  placeOfLiving: Joi.string()
    .max(255)
    .messages(errorMessage('Place Of Living')),
  accountName: Joi.string().max(225).messages(errorMessage('Account Name')),
  postalCode: Joi.string().max(225).messages(errorMessage('postal Code')),
  country: Joi.string().max(225).messages(errorMessage('Country')),
  streetAdress: Joi.string().max(225).messages(errorMessage('Street Adress')),
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

const newPasswordSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema
    .invalid(Joi.ref('oldPassword'))
    .messages(errorMessage('Password')),
});

export {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
  newPasswordSchema,
  CollectionNameSchema,
  UserDetailsSchema,
};
