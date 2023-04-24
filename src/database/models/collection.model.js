/* eslint-disable no-unused-vars */
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Collection = sequelize.define('collections', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

User.hasMany(Collection, {
  foreignKey: {
    name: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});
Collection.belongsTo(User);

export default Collection;
