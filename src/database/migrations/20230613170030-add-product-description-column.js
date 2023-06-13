import { Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('products', 'description', {
      type: Sequelize.TEXT,
      defaultValue: '',
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('products', 'description');
  },
};
