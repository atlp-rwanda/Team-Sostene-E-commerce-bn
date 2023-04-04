import UserDetailsModel from '../database/models/userDetails.model.js';
import redisClient from '../helpers';
import userServices from '../services/index';

const userDetails = async (req, res) => {
  const userId = req.user.id;
  const { gender, currency, lang, dob, placeOfLiving, tel, accNo } = req.body;
  try {
    const user = await userServices.getUserById(userId);
    let userInfo = await UserDetailsModel.findOne({
      where: { userId: user.id },
    });
    if (!userInfo) {
      userInfo = await UserDetailsModel.create({
        tel,
        userId,
        accNo,
        currency,
        lang,
        dob,
        gender,
        placeOfLiving,
      });
    }
    userInfo = await userInfo.update({
      tel: tel || userInfo.tel,
      accNo: accNo || userInfo.accNo,
      currency: currency || userInfo.currency,
      lang: lang || userInfo.lang,
      dob: dob || userInfo.dob,
      gender: gender || userInfo.gender,
      placeOfLiving: placeOfLiving || userInfo.placeOfLiving,
    });

    redisClient.del(`user:${userId}`);
    return res.status(200).json({
      message: 'Successfully updated',
      info: userInfo,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error, update failed',
      error: err.message,
    });
  }
};

export default userDetails;
