'use strict';
let { hash, compare } = require('../helper/bcrypt')

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
      User.hasMany(models.Transaction)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'username must not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email must not be empty'
        },
        isEmail: {
          msg: 'email should be valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password must not be empty'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'phone must not be empty'
        },
        isNumeric: {
          msg: 'phone must be numbers'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'address must not be empty'
        }
      }
    },
    bankAccount: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'bank account must not be empty'
        },
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hash(instance.password)
      }, 
      beforeUpdate: (instance, options) => {
        instance.password = hash(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};