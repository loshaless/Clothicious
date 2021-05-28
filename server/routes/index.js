var express = require('express')
var router = express.Router()
const UserController = require('../controller/userController')
const ProductController = require('../controller/productController')
const TransactionController = require('../controller/transactionController')
const { authentication, authorization } = require('../middleware/auth')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getOneProduct)

router.use(authentication)
router.post('/products', ProductController.create)
router.put('/products/:id', authorization, ProductController.update)
router.patch('/products/:id', authorization, ProductController.patch)
router.delete('/products/:id', authorization, ProductController.delete)

router.post('/transactions', TransactionController.create)
router.get('/transactions', TransactionController.getAllTransaction)

module.exports = router