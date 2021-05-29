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
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId must not be empty'
        }
      }
    },
    SellerId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'SellerId must not be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'ProductId must not be empty'
        }
      }
    },
    period: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'period must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'period must be an integer'
        },
        min: {
          args: [0],
          msg: 'period cannot be minus'
        },
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'status must not be empty'
        },
        isBoolean: {
          args: [true],
          msg: 'status must be boolean'
        },
      }
    },
    msgForUser: {
      type: DataTypes.STRING
    },
    msgForSeller: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};