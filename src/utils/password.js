import bcrypt from 'bcrypt';
import userServices from '../services/user.services';

const { hash, compare } = bcrypt;

async function hashPassword(password) {
  const result = await hash(password, 10);
  return result;
}

async function comparePassword(plainPassword, hashedPassword) {
  const result = await compare(plainPassword, hashedPassword);
  return result;
}

// Verify if user's old password is correct before updating a password
async function verifyOldPassword(id, oldPassword) {
  const user = await userServices.getUserById(id);
  const passwordMatches = await compare(oldPassword, user.password);
  return passwordMatches;
}

export { hashPassword, comparePassword, verifyOldPassword };
