const { Product } = require('../models')

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll()
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let UserId = req.params.id
    let { name, price, frontImg, backImg, sideImg, material, strechability, thickness, size, availability } = req.body
    Product.create({ name, UserId, price, frontImg, backImg, sideImg, material, strechability, thickness, size, availability })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
}

module.exports = ProductController