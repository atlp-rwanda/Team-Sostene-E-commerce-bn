import nodemailer from 'nodemailer';

let subject;
const sendEmail = async (reciever, req, res) => {
  subject = reciever.subject;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: process.env.GMAIL_USER,
    to: reciever.email,
    subject: reciever.subject,
    text: reciever.text,
    html: reciever.html,
    secure: true,
  };
  transporter.sendMail(options, async (error, info) => {
    if (subject !== 'webhook error' || subject !== 'expired password') {
      res.send({
        status: req.t('success'),
        Emailsent: info.response,
        token: reciever.token,
      });
    }
  });
};

export default sendEmail;
