/* eslint-disable no-unused-vars */
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Chat = sequelize.define('chats', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chats: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: [],
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

export default Chat;
