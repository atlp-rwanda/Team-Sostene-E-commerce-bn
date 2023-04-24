/** @type {import('sequelize-cli').Migration} */

const migration = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_profiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      gender: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
      },
      placeOfLiving: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'USD',
        allowNull: false,
      },
      lang: {
        type: Sequelize.STRING,
        defaultValue: 'EN',
        allowNull: false,
      },
      tel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      streetAdress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_profiles');
  },
};
export default migration;
