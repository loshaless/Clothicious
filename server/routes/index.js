var express = require('express')
var router = express.Router()
const UserController = require('../controller/userController')
const ProductController = require('../controller/productController')
const TransactionController = require('../controller/transactionController')
const { authentication, authorization, buyerAuthorization, sellerAuthorization } = require('../middleware/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.put('/profil', UserController.updateProfil)
router.patch('/profil' , UserController.changePassword)

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getOneProduct)

router.use(authentication)
router.post('/products', ProductController.create)
router.put('/products/:id', authorization, ProductController.update)
router.delete('/products/:id', authorization, ProductController.delete)

router.get('/transactions', TransactionController.getAllGoingTransaction)
router.get('/transactions/:id', TransactionController.getOneTransaction)
router.post('/transactions', TransactionController.create)
router.get('/messages/', TransactionController.getAllMessage)
router.get('/historyTransactions', TransactionController.getAllDoneTransaction)
router.patch('/buyerTransactions/:id', buyerAuthorization, TransactionController.confirmFromBuyer)
router.delete('/userMessages/:id', buyerAuthorization, TransactionController.deleteMsgUser)
router.patch('/sellerTransactions/:id', sellerAuthorization, TransactionController.confirmFromSeller)
router.delete('/sellerMessages/:id', sellerAuthorization, TransactionController.deleteMsgSeller)

module.exports = router