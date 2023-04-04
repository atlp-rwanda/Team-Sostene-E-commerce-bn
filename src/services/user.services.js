import User from '../database/models/user.model';

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

async function deleteUser(id) {
  return User.destroy({ where: { id } });
}

export default {
  getUserByEmail,
  getUserByUsername,
  createUser,
  disableAccount,
  deleteUser,
  getUserById,
};
