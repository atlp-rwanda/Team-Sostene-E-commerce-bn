/* eslint-disable import/no-cycle */
import User from '../database/models/user.model';
import { hashPassword } from '../utils';

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}
async function getUserById(id) {
  const user = await User.findByPk(id);
  return user;
}
async function getUserByUsername(username) {
  const user = await User.findOne({ where: { username } });
  return user;
}
async function createUser(details) {
  const user = await User.create(details);
  return user;
}
async function disableAccount(id) {
  const user = await User.update(
    {
      status: 'INACTIVE',
    },
    {
      where: {
        id,
      },
    }
  );

  return user;
}

async function UpdatePassword(email, pass) {
  const password = await hashPassword(pass);
  const findData = await User.findOne({
    where: { email },
  });
  findData.password = password;
  await findData.save().then((result) => result);
}
async function deleteUser(id) {
  return User.destroy({ where: { id } });
}
async function disableOtp(id) {
  const findData = await User.findByPk(id);
  findData.tfa_enabled = false;
  await findData.save();
}
async function enableOtp(id) {
  const findData = await User.findByPk(id);
  findData.tfa_enabled = true;
  await findData.save();
}

export default {
  getUserByEmail,
  getUserByUsername,
  createUser,
  disableAccount,
  deleteUser,
  getUserById,
  UpdatePassword,
  disableOtp,
  enableOtp,
};
