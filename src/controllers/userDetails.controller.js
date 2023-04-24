import { userProfileServices, userServices } from '../services';

const userDetails = async (req, res) => {
  const userId = req.user.id;
  const {
    gender,
    currency,
    lang,
    dateOfBirth,
    placeOfLiving,
    tel,
    postalCode,
    accountName,
    accountNumber,
    country,
    streetAdress,
  } = req.body;
  const user = await userServices.getUserById(userId);

  let userInfo = await userProfileServices.getUserDetailsById(user.id);
  if (!userInfo) {
    const data = {
      tel,
      userId,
      accountNumber,
      currency,
      lang,
      dateOfBirth,
      gender,
      placeOfLiving,
      postalCode,
      accountName,
      country,
      streetAdress,
    };

    userInfo = await userProfileServices.createUserDetails(data);
  }
  const dataUpdate = {
    tel: tel || userInfo.tel,
    accountNumber: accountNumber || userInfo.accountNumber,
    currency: currency || userInfo.currency,
    lang: lang || userInfo.lang,
    dateOfBirth: dateOfBirth || userInfo.dateOfBirth,
    gender: gender || userInfo.gender,
    placeOfLiving: placeOfLiving || userInfo.placeOfLiving,
    postalCode: postalCode || userInfo.postalCode,
    accountName: accountName || userInfo.accountName,
    country: country || userInfo.country,
    streetAdress: streetAdress || userInfo.streetAdress,
  };
  userInfo = await userProfileServices.updateUserDetails(userId, dataUpdate);
  const info = await userProfileServices.getUserDetailsById(userId);

  return res.status(200).json({
    code: 200,
    message: 'Successfully updated',
    info,
  });
};

export default userDetails;
