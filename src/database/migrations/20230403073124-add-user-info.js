import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */

const migration = {
  async up(queryInterface) {
    await queryInterface.createTable('user_details', {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      gender: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATEONLY,
      },
      placeOfLiving: {
        type: DataTypes.STRING,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD',
        allowNull: false,
      },
      lang: {
        type: DataTypes.STRING,
        defaultValue: 'EN',
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_details');
  },
};
export default migration;
