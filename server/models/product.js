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
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    frontImg: DataTypes.STRING,
    backImg: DataTypes.STRING,
    sideImg: DataTypes.STRING,
    material: DataTypes.STRING,
    strechability: DataTypes.BOOLEAN,
    thickness: DataTypes.INTEGER,
    size: DataTypes.STRING,
    availability: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};