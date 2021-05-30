const { User } = require('../models')
let { generateToken, verivyToken } = require('../helper/jwt')
let { hash, compare } = require('../helper/bcrypt')

class UserController {
  static register(req, res, next) {
    let { username, email, password, phone, address, bankAccount } = req.body
    User.create({ username, email, password, phone, address, bankAccount })
      .then(user => {
        let data = {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
          bankAccount: user.bankAccount
        }
        res.status(201).json(data)
      })
      .catch(next)
  }
  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({ where: { email: email } })
      .then(user => {
        if (user && compare(password, user.password)) {
          let access_token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email
          })
          res.status(200).json({ access_token })
        }
        else {
          next({ status: 401, message: 'invalid email or passsword' })
        }
      })
      .catch(next)
  }

  static updateProfil(req, res, next) {
    let id = +req.params.id
    let { username, email, phone, address, bankAccount } = req.body
    User.update({ username, email, phone, address, bankAccount }, {
      where: {id},
      returning: true
    })
      .then(user => {
        let data = {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
          bankAccount: user.bankAccount
        }
        res.status(200).json(data)
      })
      .catch(next)
  }

  static changePassword(req, res, next) { 
    let id = +req.params.id
    let { passoword } = req.body
    User.update({ passoword }, {
      where: { id }
    })
      .then(user => {
        res.status(200).json({ message: "Password has been successfully updated "})
      })
      .catch(next)
  }

}

module.exports = UserController