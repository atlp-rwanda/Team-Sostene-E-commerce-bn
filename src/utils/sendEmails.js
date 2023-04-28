import nodemailer from 'nodemailer';

const sendEmail = async (reciever, req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
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
    res.send({
      status: req.t('success'),
      Emailsent: info.response,
      token: reciever.token,
    });
  });
};

export default sendEmail;
