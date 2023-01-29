'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.historypayment, {foreignKey : 'userId'})
    }
  };
  Users.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : {msg : "Email cant be empty"},
        notEmpty : {msg : "Email cant be empty"},
        isEmail : {msg : "Email must be in email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : {msg : "Password cant be empty"},
        notEmpty : {msg : "Password cant be empty"}
      }
    },
    address: DataTypes.STRING,
    role : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    hooks : {
      beforeCreate : (user,options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return Users;
};