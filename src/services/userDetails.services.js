import UserDetailsModel from '../database/models/userDetails.model.js';

async function getUserDetailsById(userId) {
  const userInfo = await UserDetailsModel.findOne({
    where: { userId },
  });
  return userInfo;
}
async function createUserDetails(data) {
  const userInfo = await UserDetailsModel.create(data);
  return userInfo;
}
async function updateUserDetails(userId, data) {
  const userInfo = await UserDetailsModel.update(data, {
    where: { userId },
  });
  return userInfo;
}
export default { getUserDetailsById, createUserDetails, updateUserDetails };
