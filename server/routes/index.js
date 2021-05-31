var express = require('express')
var router = express.Router()
const UserController = require('../controller/userController')
const ProductController = require('../controller/productController')
const TransactionController = require('../controller/transactionController')
const { authentication, authorization } = require('../middleware/auth')

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

// router.post('/upload/front', upload.single('frontImg'), UploadImgController.uploadFront)
// router.post('/upload/back', upload.single('backImg'), UploadImgController.uploadBack)
// router.post('/upload/side', upload.single('sideImg'), UploadImgController.uploadSide)

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getOneProduct)

router.use(authentication)
// router.post('/products', ProductController.create)
router.post('/products', authorization, upload.array('images', 3), ProductController.create)
router.put('/products/:id', authorization, ProductController.update)
router.patch('/products/:id', authorization, ProductController.patch)
router.delete('/products/:id', authorization, ProductController.delete)

router.post('/transactions', TransactionController.create)
router.get('/transactions', TransactionController.getAllTransaction)

module.exports = router