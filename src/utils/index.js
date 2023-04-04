import errorMessage from './errormessage';
import { hashPassword, comparePassword } from './password';
import {
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
} from './token';
import {
  LoginSchema,
  SignUpSchema,
  PasswordSchema,
} from './validationSchemas/authenticationSchemas';
import CollectionNameSchema from './validationSchemas/collectionSchemas';

export {
  errorMessage,
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
  LoginSchema,
  SignUpSchema,
  CollectionNameSchema,
  PasswordSchema,
};
