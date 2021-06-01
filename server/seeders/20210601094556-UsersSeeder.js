'use strict';
const User = require('./dummydata/user.json')
const axios = require('axios')
const { hash } = require('../helper/bcrypt')

User.forEach((el, i) => {
  const password = hash(el.password) 
  el.password = password
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', User, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
