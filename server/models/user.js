'use strict';
let { hash, compare } = require('../helper/bcrypt')
const axios = require('axios')

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
        const password = hash(instance.password)
        const secret = password.substring(0, 5)
        instance.password = password
        const data = {
          "username": instance.username,
          "secret": secret
        }

        axios({
          method: 'post',
          url: 'https://api.chatengine.io/users/',
          headers: {
            'PRIVATE-KEY': '0cf963af-f223-46a4-b33b-f279bec65c17'
          },
          data: data
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error, 'error chatengine di model user');
          });

      },
    },
    modelName: 'User',
  });
  return User;
};