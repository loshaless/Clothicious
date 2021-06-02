'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User)
      Product.hasMany(models.Transaction)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name must not be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId must not be empty'
        }
      }
    },
    rentPrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'price must be an integer'
        },
        min: {
          args: [0],
          msg: 'price cannot be minus'
        },
      }
    },
    guaranteePrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'price must be an integer'
        },
        min: {
          args: [0],
          msg: 'price cannot be minus'
        },
      }
    },
    frontImg: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'frontImg must not be empty'
        },
        isUrl: {
          args: [true],
          msg: 'frontImg must be an URL'
        }
      },
    },
    backImg: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'backImg must not be empty'
        },
        isUrl: {
          args: [true],
          msg: 'backImg must be an URL'
        }
      }
    },
    sideImg: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'sideImg must not be empty'
        },
        isUrl: {
          args: [true],
          msg: 'sideImg must be an URL'
        }
      },
    },
    fit: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'fit must not be empty'
        },
      }
    },
    lining: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'lining must not be empty'
        },
        isBoolean: {
          args: [true],
          msg: 'lining must be boolean'
        },
      }
    },
    sheerLevel: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'sheerLevel must not be empty'
        },
        isBoolean: {
          args: [true],
          msg: 'sheerLevel must be boolean'
        },
      }
    },
    bustSize: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'bustSize must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'bustSize must be an integer'
        },
        min: {
          args: [0],
          msg: 'bustSize cannot be minus'
        },
      }
    },
    waistSize: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'waistSize must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'waistSize must be an integer'
        },
        min: {
          args: [0],
          msg: 'waistSize cannot be minus'
        },
      }
    },
    hipsSize: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'hipsSize must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'hipsSize must be an integer'
        },
        min: {
          args: [0],
          msg: 'hipsSize cannot be minus'
        },
      }
    },
    length: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'length must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'length must be an integer'
        },
        min: {
          args: [0],
          msg: 'length cannot be minus'
        },
      }
    },
    stretchability: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'stretchability must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'stretchability must be an integer'
        },
        min: {
          args: [0],
          msg: 'min stretchability is 0'
        },
        max: {
          args: [5],
          msg: 'max stretchability is 5'
        },
      }
    },
    thickness: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'thickness must not be empty'
        },
        isInt: {
          args: [true],
          msg: 'thickness must be an integer'
        },
        min: {
          args: [0],
          msg: 'min thickness is 0'
        },
        max: {
          args: [5],
          msg: 'max thickness is 5'
        },
      }
    },
    availability: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'availability must not be empty'
        },
        isBoolean: {
          args: [true],
          msg: 'availability must be boolean'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'description must not be empty'
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'category must not be empty'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};