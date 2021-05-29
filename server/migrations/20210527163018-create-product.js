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
      rentPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      guaranteePrice: {
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
      fit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lining: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      sheerLevel: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      bustSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      waistSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hipsSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      length: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stretchability: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      thickness: {
        allowNull: false,
        type: Sequelize.INTEGER
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