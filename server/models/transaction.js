'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'UserId'
      })
      Transaction.belongsTo(models.User, {
        as: 'seller',
        foreignKey: 'SellerId',
      })
      Transaction.belongsTo(models.Product)
    }
  };
  Transaction.init({
    UserId: DataTypes.INTEGER,
    SellerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    period: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};