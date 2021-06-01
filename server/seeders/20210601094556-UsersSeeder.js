'use strict';
const User = require('./dummydata/user.json')
const { hash } = require('../helper/bcrypt')

User.forEach(el => el.password = hash(el.password))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', User, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
