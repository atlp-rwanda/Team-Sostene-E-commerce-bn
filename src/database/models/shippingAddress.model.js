import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const ShippingAddress = sequelize.define('shippingaddresses', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  postalCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

ShippingAddress.belongsTo(User, {
  as: 'userShippingAddress',
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'CASCADE',
});

export default ShippingAddress;
