'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historypayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      historypayment.belongsTo(models.Users, {foreignKey : 'userId'});
      historypayment.belongsTo(models.Products, {foreignKey : 'productId'});

    }
  };
  historypayment.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'historypayment',
  });
  return historypayment;
};