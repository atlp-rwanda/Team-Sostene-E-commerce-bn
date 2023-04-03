import { userServices } from '../services';

const tfaEnableDisable = async (req, res) => {
  try {
    const { user } = req;
    if (!user.tfa_enabled) {
      userServices.enableOtp(user.id);
      return res.status(200).json({
        code: 200,
        message: `OTP option enabled successfully`,
      });
    }
    userServices.disableOtp(user.id);
    return res.status(200).json({
      code: 200,
      message: `OTP option disabled successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default tfaEnableDisable;
