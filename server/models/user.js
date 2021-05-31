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
        instance.password = hash(instance.password)
        const data = {
          "username" : instance.username,
          "secret" : instance.password
        }

        axios({
          method: 'post',
          url: 'https://api.chatengine.io/users/',
          headers: { 
            'PRIVATE-KEY': '93a6043a-5d0f-4587-bbd7-957fe1885986'
          },
          data : data
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error, 'error chatengine di model user');
        });


      },
    },
    modelName: 'User',
  });
  return User;
};