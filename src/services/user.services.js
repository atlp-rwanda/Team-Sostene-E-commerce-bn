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

export default { getUserByEmail, getUserById, getUserByUsername, createUser };
