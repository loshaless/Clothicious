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
    let availability = true
    let { name, price, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, strechability, thickness, availability } = req.body
    Product.create({ name, UserId, price, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, strechability, thickness, availability })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

}

module.exports = ProductController