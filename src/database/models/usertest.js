const { Model } = require('sequelize');

/* eslint-disable*/
module.exports = (sequelize, DataTypes) => {
  class Usertest extends Model {
    /**\docs\rules\valid-jsdoc
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     */
    /* eslint-enable */
    static associate() {
      // define association here
    }
  }
  Usertest.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Usertest',
    }
  );
  return Usertest;
};
