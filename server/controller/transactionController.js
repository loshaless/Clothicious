const { Product, Transaction } = require('../models')

class TransactionController {
  static async getAllTransaction(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      const transaction = await Transaction.findAll({ where: { UserId }, include: [Product] })
      res.status(200).json(transaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      let { SellerId, ProductId, period } = req.body
      const transaction = await Transaction.create({ UserId, SellerId, ProductId, period })
      res.status(201).json(transaction)
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController