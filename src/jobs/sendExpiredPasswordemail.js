import { sendEmails } from '../utils';
import { notificationTemplates } from '../helpers';

const sendPasswordChangePromptEmail = async (users) => {
  const emailList = users.map((user) => user.email).join(', ');
  const mailBody = {
    email: emailList,
    subject: 'expired password',
    html: `${notificationTemplates.sendExpiredPasswordMailTemplate()}`,
  };
  await sendEmails(mailBody);
};

export default { sendPasswordChangePromptEmail };
