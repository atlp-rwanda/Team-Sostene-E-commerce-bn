"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable require-jsdoc */
/* eslint-disable prettier/prettier */

const sequelize = new _sequelize.Sequelize(_config.default.development);
class User extends _sequelize.Model {
  // eslint-disable-next-line require-jsdoc
  static associate(models) {
    // define association here
  }
}
User.init({
  fullNames: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      min: 2,
      isLowercase: true
    }
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
      min: 8
    }
  }
}, {
  sequelize,
  modelName: 'User'
});
User.beforeCreate(async (user, options) => {
  // Hash the user's password before saving it to the database
  const salt = await _bcryptjs.default.genSalt(10);
  const hashedPassword = await _bcryptjs.default.hash(user.password, salt);
  user.password = hashedPassword;
});
var _default = User;
exports.default = _default;