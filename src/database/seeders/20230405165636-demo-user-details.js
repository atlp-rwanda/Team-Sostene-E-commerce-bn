/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';
import { userServices, userProfileServices } from '../../services';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const user = await userServices.getUserByEmail('testing@example.com');
  const userDetail = await userProfileServices.getUserDetailsById(
    user.dataValues.id
  );
  if (user && !userDetail) {
    await queryInterface.bulkInsert('user_profiles', [
      {
        id: uuidv4(),
        userId: user.dataValues.id,
        gender: 'male',
        dateOfBirth: '2000-02-02',
        placeOfLiving: 'Kigali',
        currency: 'RWF',
        lang: 'Kinyarwanda',
        tel: '+12345678908',
        accountNumber: '777',
        accountName: 'Equity',
        postalCode: '0000',
        country: 'Rwanda',
        streetAdress: 'Kn109',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete('user_profiles', null, {});
}
