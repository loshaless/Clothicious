var express = require('express')
var router = express.Router()
const UserController = require('../controller/userController')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/register', UserController.register)

module.exports = router