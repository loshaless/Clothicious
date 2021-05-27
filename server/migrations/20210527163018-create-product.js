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
        allowNull: false,
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      frontImg: {
        allowNull: false,
        type: Sequelize.STRING
      },
      backImg: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sideImg: {
        allowNull: false,
        type: Sequelize.STRING
      },
      material: {
        allowNull: false,
        type: Sequelize.STRING
      },
      strechability: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      thickness: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      availability: {
        allowNull: false,
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