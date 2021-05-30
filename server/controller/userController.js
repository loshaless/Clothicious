const { User } = require('../models')
let { generateToken, verivyToken } = require('../helper/jwt')
let { hash, compare } = require('../helper/bcrypt')

class UserController {
  static register(req, res, next) {
    let { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        let data = {
          id: user.id,
          username: user.username,
          email: user.email,
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
          res.status(200).json({access_token})
        }
        else {
          next({ 
            status: 401, 
            message: 'invalid email or password' })
        }
      })
      .catch(next)
  }

  // static allUser(req, res, next) {
  //   console.log("disni");
  //   User.findAll()
  //     .then(user => {
  //       let username = user.map(e => e.username)
  //       res.status(200).json(username)
  //     })
  //     .catch(next)
  // }

  static updateProfil(req, res, next) {
    let id = req.loggedUser.id
    let { username, email, phone, address, bankAccount } = req.body
    // console.log(req.body, id);
    User.update({ username, email, phone, address, bankAccount }, {
      where: { id },
      returning: true
    })
      .then(user => {
        let data = {
          id: user[1][0].id,
          username: user[1][0].username,
          email: user[1][0].email,
          phone: user[1][0].phone,
          address: user[1][0].address,
          bankAccount: user[1][0].bankAccount
        }
        res.status(200).json(data)
      })
      .catch(next)
  }

  static changePassword(req, res, next) {
    let id = +req.loggedUser.id
    let { password } = req.body
    let updatedPassword = hash(password)
    User.update({ password: updatedPassword }, {
      where: { id }
    })
      .then(user => {
        res.status(200).json({ message: "Password has been successfully updated" })
      })
      .catch(next)
  }
}

module.exports = UserController