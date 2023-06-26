/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { hashPassword } from '../../utils/password';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM users WHERE email='testingdisable@example.com'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: 'd6dd41cc-df82-495f-a1f9-5584dfe2b1a5',
        username: 'testingdisable',
        email: 'testingdisable@example.com',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastPasswordUpdate: new Date(),
        passwordStatus: 'PASSWORD_UPDATED',
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'testingdisable@example.com'"
  );
}
