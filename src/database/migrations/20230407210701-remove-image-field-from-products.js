/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('products', 'images');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'images', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
  },
};
