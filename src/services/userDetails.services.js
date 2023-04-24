import UserDetailsModel from '../database/models/userDetails.model';

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
async function deleteUserDetails(userId) {
  const userInfo = await UserDetailsModel.destroy({ where: { userId } });
  return userInfo;
}
export default {
  getUserDetailsById,
  createUserDetails,
  deleteUserDetails,
  updateUserDetails,
};
