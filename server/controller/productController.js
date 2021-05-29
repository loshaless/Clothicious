const { Product, Transaction } = require('../models')

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll()
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static getOneProduct(req, res, next) {
    let id = req.params.id
    Product.findOne({ where: { id } })
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let UserId = req.loggedUser.id
    let availability = true
    let { name, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness } = req.body
    Product.create({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
  static update(req, res, next) {
    let UserId = req.loggedUser.id
    let id = req.params.id
    let { name, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability } = req.body
    Product.update({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability }, { where: { id }, returning: true })
      .then(data => {
        let productData = data[1][0]
        res.status(200).json(productData)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let id = req.params.id
    Product.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: 'Product has been deleted' })
      })
      .catch(next)
  }
}

module.exports = ProductController