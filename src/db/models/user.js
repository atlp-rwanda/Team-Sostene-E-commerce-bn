/* eslint-disable require-jsdoc */
/* eslint-disable prettier/prettier */
import { Sequelize ,Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs'
import config from '../config/config';

const sequelize = new Sequelize(config.development);

class User extends Model {
// eslint-disable-next-line require-jsdoc
static associate(models) {
// define association here
}
}

User.init({
fullNames: {
type: DataTypes.STRING,
allowNull: false,
},
username: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
notEmpty: true,
min: 2,
isLowercase: true,
},
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
isEmail: true,
notEmpty: true,
},
},
password: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notEmpty: true,
isAlphanumeric: true,
min: 8
},
},
}, {
sequelize,
modelName: 'User',
});

User.beforeCreate(async (user, options) => {
  // Hash the user's password before saving it to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
});

export default User;
