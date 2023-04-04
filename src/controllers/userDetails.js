import { userProfileServices, userServices } from '../services';

const userDetails = async (req, res) => {
  const userId = req.user.id;
  const { gender, currency, lang, dob, placeOfLiving, tel, accNo } = req.body;
  try {
    const user = await userServices.getUserById(userId);
    let userInfo = await userProfileServices.getUserDetailsById(user.id);
    if (!userInfo) {
      const data = {
        tel,
        userId,
        accNo,
        currency,
        lang,
        dob,
        gender,
        placeOfLiving,
      };
      userInfo = await userProfileServices.createUserDetails(data);
    }
    const dataUpdate = {
      tel: tel || userInfo.tel,
      accNo: accNo || userInfo.accNo,
      currency: currency || userInfo.currency,
      lang: lang || userInfo.lang,
      dob: dob || userInfo.dob,
      gender: gender || userInfo.gender,
      placeOfLiving: placeOfLiving || userInfo.placeOfLiving,
    };
    userInfo = await userProfileServices.updateUserDetails(userId, dataUpdate);

    return res.status(200).json({
      message: 'Successfully updated',
      info: userInfo.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error, update failed',
      error: err.message,
    });
  }
};

export default userDetails;
