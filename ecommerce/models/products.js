'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.hasMany(models.historypayment, {foreignKey : 'productId'})
    }
  };
  Products.init({
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};