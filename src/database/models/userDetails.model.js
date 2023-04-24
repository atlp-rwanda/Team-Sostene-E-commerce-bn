import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

const UserDetailsModel = sequelize.define('user_profiles', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  gender: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
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
  accountNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  accountName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  postalCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  streetAdress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

UserDetailsModel.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

export default UserDetailsModel;
