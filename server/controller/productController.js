const { Product } = require('../models')
const cloudinary = require('cloudinary').v2;

class ProductController {
  static getProducts(req, res, next) {
    Product.findAll()
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static getOneProduct(req, res, next) {
    let id = req.params.id
    Product.findOne({ where: { id } })
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
  static create(req, res, next) {
    cloudinary.uploader.upload(file, async (err, image) => {
      try {
        if (!err) {
          console.log("* " + image.secure_url);
          let UserId = req.loggedUser.id
          let availability = true
          let { name, rentPrice, guaranteePrice, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness } = req.body
          let frontImg = ''
          let backImg = ''
          let sideImg = ''

          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const newPath = await cloudinaryImageUploadMethod(path)
            urls.push(newPath)
          }
          
          urls.forEach(image => {
            frontImg = image[0]
            backImg = image[1]
            sideImg = image[2]
          })

          const newData = await Product.create({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability })
            res.status(201).json({
              message: "File Uploaded",
              data: newData
            })
        } else {
          throw ({
            message: "Error Upload",
          })
        }
      } catch (error) {
        next(error)
      };
    })
  }

  static update(req, res, next) {
    let UserId = req.loggedUser.id
    let id = req.params.id
    let { name, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability } = req.body
    Product.update({ name, UserId, rentPrice, guaranteePrice, frontImg, backImg, sideImg, fit, lining, sheerLevel, bustSize, waistSize, hipsSize, length, stretchability, thickness, availability }, { where: { id }, returning: true })
      .then(data => {
        let productData = data[1][0]
        res.status(200).json(productData)
      })
      .catch(next)
  }
  static patch(req, res, next) {
    let id = req.params.id
    let { availability } = req.body
    Product.update({ availability }, { where: { id }, returning: true })
      .then(data => {
        let dataReturn = data[1][0]
        res.status(200).json(dataReturn)
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