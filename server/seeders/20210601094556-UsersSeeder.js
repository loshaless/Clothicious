'use strict';
const User = require('./dummydata/user.json')
const axios = require('axios')
const { hash } = require('../helper/bcrypt')

User.forEach((el, i) => {
  const password = hash(el.password) 
  el.password = password
  
  // const data = {
  //   "username": el.username,
  //   "secret": password.substring(0, 5),
  //   "avatar": "https://i.pravatar.cc/300"
  // }
  // console.log('asdasd')
  
  // axios({
  //   method: 'post',
  //   url: 'https://api.chatengine.io/users/',
  //   headers: {
  //     'PRIVATE-KEY': '0cf963af-f223-46a4-b33b-f279bec65c17'
  //   },
  //   data: data
  // })
  // .then(response => {
  //   console.log('oke', i)
  // })
  // .catch(error => {
  //   console.log(error, 'error chatengine di model user');
  // });
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', User, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
