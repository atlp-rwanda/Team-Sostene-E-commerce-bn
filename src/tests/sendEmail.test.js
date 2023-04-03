import { expect } from 'chai';
import sendEmail from '../utils/sendEmails';

describe('sendEmail', function () {
  it('should send an email successfully', async function () {
    const reciever = {
      email: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<h1>This is a test email</h1>',
      token: 'abc123',
    };
    const req = { t: () => 'success' };
    const res = {
      send: (result) => {
        expect(result.status).to.equal('success');
        expect(result.Emailsent).to.be.a('string');
        expect(result.token).to.equal('abc123');
      },
    };
    await sendEmail(reciever, req, res);
  });
});
