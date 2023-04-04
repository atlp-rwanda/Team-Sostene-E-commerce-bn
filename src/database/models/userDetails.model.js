import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';

const UserDetailsModel = sequelize.define('user_details', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  gender: {
    type: Sequelize.STRING,
  },
  dob: {
    type: Sequelize.DATEONLY,
  },
  placeOfLiving: {
    type: Sequelize.STRING,
  },
  currency: {
    type: Sequelize.STRING,
    defaultValue: 'USD',
    allowNull: false,
  },
  lang: {
    type: Sequelize.STRING,
    defaultValue: 'EN',
    allowNull: false,
  },
  tel: {
    type: Sequelize.STRING(20),
    allowNull: true,
  },
  accNo: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
});

export default UserDetailsModel;
