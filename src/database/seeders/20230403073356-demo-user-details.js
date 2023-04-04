/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import userServices from '../../services/index.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const user = await userServices.getUserByEmail('testing@example.com');
  if (user) {
    await queryInterface.bulkInsert('user_details', [
      {
        id: 1,
        userId: user.dataValues.id,
        gender: 'Male',
        dob: '2000-02-02',
        currency: 'RWF',
        lang: 'Kinyarwanda',
        tel: '+2507800171',
        accNo: '123454809',
        placeOfLiving: 'Kigali',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete('user_details', null, {});
}
