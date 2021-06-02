const cloudinary = require('cloudinary').v2;
const { Product, User } = require('../models')

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll({ include: [User] })
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static getOneProduct(req, res, next) {
    let id = req.params.id
    Product.findOne({
      where: { id },
      include: [
        { model: User, include: [Product] }
      ]
    })
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  // static create(req, res, next) {
  //   let UserId = req.loggedUser.id
  //   let availability = true
  //   let { name, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness } = req.body
  //   Product.create({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability })
  //     .then(data => {
  //       res.status(201).json(data)
  //     })
  //     .catch(next)
  // }

  /** CREATE WITH UPLOAD FILES */
  static async create(req, res, next) {
    try {
      console.log('here')
      const cloudinaryImageUploadMethod = async file => {
        return new Promise(resolve => {
            cloudinary.uploader.upload( file , (err, res) => {
              if (err) throw {status: 500, message: "error upload images"}
                resolve({
                  res: res.secure_url
                }) 
              }
            ) 
        })
      }
      let UserId = req.loggedUser.id
      let availability = true
      let { name, rentPrice, guaranteePrice, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, category, description } = req.body
      let frontImg = ''
      let backImg = ''
      let sideImg = ''

      const productImages = [];
      let files = req.files;
      for (const file of files) {
        let { path } = file;
        path = path.replace('\\', '/');
        console.log(path)
        const newPath = await cloudinaryImageUploadMethod(path)
        console.log(newPath.res)
        productImages.push(newPath.res)
      }

        frontImg = productImages[0]
        backImg = productImages[1]
        sideImg = productImages[2]
        
      // Adding to Database
      const newData = await Product.create({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, category, description, availability })
        res.status(201).json({
          message: "File Uploaded",
          data: newData
        })
    } catch (error) {
      next(error)
    };
  }

  static update(req, res, next) {
    let UserId = req.loggedUser.id
    let id = req.params.id
    let { name, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability, description, category } = req.body
    Product.update({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability, description, category }, { where: { id }, returning: true })
      .then(data => {
        let productData = data[1][0]
        res.status(200).json(productData)
      })
      .catch(next)
  }
  static delete(req, res, next) {
    let id = req.params.id
    Product.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: 'Product has been deleted' })
      })
      .catch(next)
  }
}

module.exports = ProductController