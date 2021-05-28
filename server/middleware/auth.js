const { generateToken, verivyToken } = require('../helper/jwt')
const { User, Product } = require('../models')

function authentication(req, res, next) {
  try {
    let decoded = verivyToken(req.headers.access_token)
    User.findOne({ where: { email: decoded.email } })
      .then(user => {
        if (user) {
          req.loggedUser = decoded
          next()
        }
        else {
          next({ status: 401, message: 'authentication failed' })
        }
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}

function authorization(req, res, next) {
  Product.findOne({ where: { id: req.params.id, UserId: req.loggedUser.id } })
    .then(foundTask => {
      if (foundTask) {
        next()
      }
      else {
        next({ status: 401, message: 'unauthorized' })
      }
    })
    .catch(next)
}

module.exports = { authentication, authorization }