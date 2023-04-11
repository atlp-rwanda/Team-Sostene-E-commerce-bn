const ForgortPasswordTemplate = (token) => `
    <p>Reset your password.</p>
    <p>Please click the link below to reset your password.</p>
    http://${process.env.PRODUCTION_URL}/users/reset-password/${token}
    `;

export default ForgortPasswordTemplate;
