const { Product, Transaction } = require('../models')

class TransactionController {
  static async getAllTransaction(req, res, next) {
    try {
      await Transaction.findAll({
        where: { id }, order: [
          ['id', 'ASC'],
        ], include: [Product],
      })
    }
    catch (error) {
      next(error)
    }
  }

  static create(req, res, next) {
    let BuyerId = req.loggedUser.id
    let { SellerId, ProductId, period } = req.body
    console.log(SellerId, ProductId, period, "disini");
    Transaction.create({ BuyerId, SellerId, ProductId, period })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
}

module.exports = TransactionController