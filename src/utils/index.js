import errorMessage from './errormessage';
import generateOtp from './generateOtp';
import sendEmails from './sendEmails';
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
  newPasswordSchema,
} from './validationSchemas/authenticationSchemas';
import CollectionNameSchema from './validationSchemas/collectionSchemas';
import addproductSchema from './validationSchemas/productSchema';

export {
  errorMessage,
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
  generateForgetPasswordToken,
  decodeResetPasswordToken,
  generateOtp,
  sendEmails,
  LoginSchema,
  SignUpSchema,
  CollectionNameSchema,
  PasswordSchema,
  newPasswordSchema,
  addproductSchema,
};
