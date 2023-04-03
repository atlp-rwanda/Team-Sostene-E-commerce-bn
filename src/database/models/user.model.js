import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'BUYER', 'SELLER'),
    defaultValue: 'BUYER',
  },
  status: {
    type: DataTypes.ENUM('INACTIVE', 'ACTIVE'),
    defaultValue: 'ACTIVE',
  },
});

export default User;
