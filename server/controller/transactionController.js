const { Product, Transaction, User } = require('../models')

class TransactionController {
  static async getAllGoingTransaction(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      const currentlyRenting = await Transaction.findAll({ where: { UserId, status: true }, include: [{ model: User, as: 'seller' }, Product] })
      const rentedProducts = await Transaction.findAll({ where: { SellerId: UserId, status: true }, include: [{ model: User, as: 'user' }, Product] })
      const allTransaction = { currentlyRenting, rentedProducts }
      res.status(200).json(allTransaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async getAllDoneTransaction(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      const currentlyRenting = await Transaction.findAll({ where: { UserId, status: false }, include: [{ model: User, as: 'seller' }, Product] })
      const rentedProducts = await Transaction.findAll({ where: { SellerId: UserId, status: false }, include: [{ model: User, as: 'user' }, Product] })
      const allTransaction = { currentlyRenting, rentedProducts }
      res.status(200).json(allTransaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      let { SellerId, ProductId, period } = req.body
      const transaction = await Transaction.create({ UserId, SellerId, ProductId, period, status: true })
      await Product.update({ availability: false }, { where: { id: ProductId } })
      res.status(201).json(transaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async doneTransaction(req, res, next) {
    try {
      let id = req.params.id
      let UserId = req.loggedUser.id
      let { ProductId } = req.body
      await Transaction.update({ status: false }, { where: { id, SellerId: UserId } })
      await Product.update({ availability: true }, { where: { id: ProductId, UserId } })
      res.status(200).json({ message: "transaction status sudah false dan product availability sudah true" })
    }
    catch (error) {

    }
  }
}

module.exports = TransactionController