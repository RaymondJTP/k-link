'use strict';
const data = require("../data/product.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Products', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
