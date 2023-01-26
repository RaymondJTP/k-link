'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require("../data/user.json")
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
