const { User } = require('../models')
let { generateToken, verivyToken } = require('../helper/jwt')
let { hash, compare } = require('../helper/bcrypt')

class UserController {
  static register(req, res, next) {
    let { username, email, password } = req.body
    // console.log(req.body, "register");
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
    // console.log(req.body, "login");
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
}

module.exports = UserController