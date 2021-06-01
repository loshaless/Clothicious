var express = require('express')
var router = express.Router()
const UserController = require('../controller/userController')
const ProductController = require('../controller/productController')
const TransactionController = require('../controller/transactionController')

/** ------------------------------------- */
/** Code Multer */
const multer = require('multer')
const path = require('path')
const UploadImgController = require('../controller/uploadImgController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
/** ------------------------------------- */

router.get('/', (req, res) => {
  res.send('Hello World!')
})

const { authentication, authorization, buyerAuthorization, sellerAuthorization } = require('../middleware/auth')
const MidtransController = require('../controller/midtransController')


// router.post('/upload/front', upload.single('frontImg'), UploadImgController.uploadFront)
// router.post('/upload/back', upload.single('backImg'), UploadImgController.uploadBack)
// router.post('/upload/side', upload.single('sideImg'), UploadImgController.uploadSide)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/users', UserController.getUserChatEngine)

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getOneProduct)

router.use(authentication)

// router.post('/products', ProductController.create)
router.post('/products', upload.array('productImages', 3), ProductController.create)

router.post('/getTokenMidtrans', MidtransController.runDummy) // dummy midtrans
router.get('/loggedUsers', UserController.loggedUser)
router.put('/profil/:id', UserController.updateProfil)
router.patch('/profil/:id', UserController.changePassword)

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