/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.bulkInsert('Usertests', [
      {
        firstName: 'norbert',
        lastName: 'ishimwesdf',
        email: 'example2@example.com',
=======
    await queryInterface.bulkInsert('Users', [
      {
        fullNames: 'norbert',
        username: 'ishimwesdf',
        email: 'example2@example.com',
        password: 'password22',
>>>>>>> 15a5efe (ch(database): configures the App to use)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.bulkDelete('Usertests', null, {});
=======
    await queryInterface.bulkDelete('Users', null, {});
>>>>>>> 15a5efe (ch(database): configures the App to use)
  },
};
