import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Collection from './collection.model.js';
import Images from './images.model.js';

const Products = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bonus: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  collectionId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'collections',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  expiredflag: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Products.belongsTo(Collection, { onDelete: 'cascade' });
Products.hasMany(Images, { as: 'productImages', onDelete: 'cascade' });

export default Products;
