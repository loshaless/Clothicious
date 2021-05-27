var express = require('express')
var router = express.Router()
const UserController = require('../controller/userController')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router