/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../utils/password';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const userId = uuidv4();
  const [resultOne] = await queryInterface.sequelize.query(`
  SELECT COUNT(*) AS count FROM users WHERE email='testingseller@example.com'
`);
  // eslint-disable-next-line eqeqeq
  if (resultOne[0].count == 0) {
    await queryInterface.bulkInsert('users', [
      {
        id: userId,
        username: 'testingseller',
        email: 'testingseller@example.com',
        role: 'SELLER',
        password: await hashPassword('Qwert@12345'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
  const [result] = await queryInterface.sequelize.query(`
      SELECT COUNT(*) AS count FROM collections WHERE name='testing Collection'
    `);
  // eslint-disable-next-line eqeqeq
  if (result[0].count == 0) {
    await queryInterface.bulkInsert('collections', [
      {
        id: uuidv4(),
        userId,
        name: 'testing Collection',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'testing@example.com'"
  );
  await queryInterface.sequelize.query(
    "DELETE FROM users WHERE email = 'testingseller@example.com'"
  );
}
