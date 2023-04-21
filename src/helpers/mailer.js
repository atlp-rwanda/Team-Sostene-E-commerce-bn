import emailServices from '../services/email.services';

const sendEmailReset = (mailConfigurations) => {
  emailServices({
    email: mailConfigurations.to,
    subject: mailConfigurations.subject,
    content: mailConfigurations.html,
  });
  return true;
};

export default sendEmailReset;
