import redisClient from './redis';
import ForgortPasswordTemplate from './TemplateMail';
import sendEmailReset from './mailer';
import configEmail from './configEmail';

export { redisClient, ForgortPasswordTemplate, sendEmailReset, configEmail };
