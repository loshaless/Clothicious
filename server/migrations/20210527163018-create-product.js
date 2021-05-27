'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      frontImg: {
        type: Sequelize.STRING
      },
      backImg: {
        type: Sequelize.STRING
      },
      sideImg: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      strechability: {
        type: Sequelize.BOOLEAN
      },
      thickness: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};