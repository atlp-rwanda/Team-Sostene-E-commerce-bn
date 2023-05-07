/** @type {import('sequelize-cli').Migration} */
import { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn('products', 'expiredflag', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('products', 'expiredflag', {});
  },
};
