import redisClient from './redis';
import ForgortPasswordTemplate from './TemplateMail';
import sendEmailReset from './mailer';
import configEmail from './configEmail';
import Cloudinary from './cloudinary';
import Upload from './multer';

export {
  redisClient,
  ForgortPasswordTemplate,
  sendEmailReset,
  configEmail,
  Cloudinary,
  Upload,
};
