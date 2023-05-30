import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ email, subject, content }) {
  const msg = {
    to: email, // Change to your recipient
    from: process.env.SENDER, // Change to your verified sender
    subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: content,
  };
  sgMail.send(msg);
}

export default sendEmail;
