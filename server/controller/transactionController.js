const { Product, Transaction, User } = require('../models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

class TransactionController {
  static async getAllGoingTransaction(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      const currentlyRenting = await Transaction.
        findAll({ 
          where: { 
            UserId, 
            status: true 
          }, 
          include: [{ 
            model: User, 
            as: 'seller' }, 
          Product] })
      const rentedProducts = await Transaction.
        findAll({ 
          where: { 
            SellerId: UserId, 
            status: true }, 
          include: [{ 
            model: User, 
            as: 'user' }, 
          Product] 
        })
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
      const currentlyRenting = await Transaction.
        findAll({ 
          where: { UserId, status: false }, 
          include: 
            [{ model: User, 
              as: 'seller' }, 
            Product ] 
        })
      const rentedProducts = await Transaction.
        findAll({ 
          where: { 
            SellerId: UserId, 
            status: false }, 
          include: [{ 
            model: User, 
            as: 'user' }, 
          Product] 
        })
      const allTransaction = { currentlyRenting, rentedProducts }
      res.status(200).json(allTransaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async getOneTransaction(req, res, next) {
    try {
      let id = req.params.id
      const transaction = await Transaction.findOne({ where: { id }, include: [{ model: User, as: 'seller' }, { model: User, as: 'user' }, Product] })
      res.status(200).json(transaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async getAllMessage(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      const currentlyRenting = await Transaction.findAll({ where: { UserId, msgForUser: { [Op.ne]: null } } })
      const rentedProducts = await Transaction.findAll({ where: { SellerId: UserId, msgForSeller: { [Op.ne]: null } } })

      const msgAsUser = await currentlyRenting.map(e => {
        let filterData = {
          transactionId: e.id,
          message: e.msgForUser
        }
        return filterData
      })
      const msgAsSeller = await rentedProducts.map(e => {
        let filterData = {
          transactionId: e.id,
          message: e.msgForSeller
        }
        return filterData
      })
      res.status(200).json({ msgAsUser, msgAsSeller })
    }
    catch {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      let UserId = req.loggedUser.id
      let { SellerId, ProductId, period } = req.body
      const transaction = await Transaction.
        create({ UserId, SellerId, ProductId, period, status: true })
      await Product.
        update({ availability: false }, { 
          where: { id: ProductId } 
        })
      res.status(201).json(transaction)
    }
    catch (error) {
      next(error)
    }
  }

  static async confirmFromBuyer(req, res, next) {
    try {
      let id = req.params.id
      await Transaction.update({
        msgForSeller: "have you received back your package?",
        period: null,
        confirmationPeriod: 3
      }, { where: { id } })
      res.status(200).json({ message: "message changed" })
    }
    catch (error) {
      next(error)
    }
  }

  static async confirmFromSeller(req, res, next) {
    try {
      let id = req.params.id
      let UserId = req.loggedUser.id
      let { ProductId } = req.body
      await Product.update({ availability: true }, { where: { id: ProductId, UserId } })
      await Transaction.update({
        status: false,
        msgForUser: "your deposit will be returned to you in 3 days",
        msgForSeller: "your money will be sent to you in 3 days"
      },
        { where: { id } })
      await Product.update({ availability: true }, { where: { id: ProductId, UserId } })
      res.status(200).json({ message: "transaction status and availibility has been updated" })
    }
    catch (error) {
      next(error)
    }
  }

  static async deleteMsgUser(req, res, next) {
    try {
      let id = req.params.id
      await Transaction.update({ msgForUser: null, }, { where: { id } })
      res.status(200).json({ message: "message has been deleted" })
    }
    catch (error) {
      next(error)
    }
  }

  static async deleteMsgSeller(req, res, next) {
    try {
      let id = req.params.id
      await Transaction.update({ msgForSeller: null, }, { where: { id } })
      res.status(200).json({ message: "message has been deleted" })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController