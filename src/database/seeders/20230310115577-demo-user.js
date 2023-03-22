/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.bulkInsert('users', [
    {
      id: uuidv4(),
      username: 'norbert',
      email: 'example2@example.com',
      password: 'ishimwe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete('users', null, {});
}
