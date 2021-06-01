const cloudinary = require('cloudinary').v2;

class UploadImgController {
  static async uploadFront(req, res, next) {
    console.log('<<<< masuukkkk front')
    console.log(req.file)
    
    cloudinary.uploader.upload(req.file.path, async (err, image) => {
        try {
            if (!err) {
          console.log('>>>> MASUK CLOUDI front')
          console.log("* " + image.secure_url);
          // res.status(201).json({
          //   message: "File Uploaded",
          //   data: newData
          // })
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

  static async uploadBack(req, res, next) {
    console.log('<<<< masuukkkk back')

    cloudinary.uploader.upload(req.file.path, async (err, image) => {
        try {
            if (!err) {
          console.log('>>>> MASUK CLOUDI back')
          console.log("* " + image.secure_url);
          // res.status(201).json({
          //   message: "File Uploaded",
          //   data: newData
          // })
        } else {
          throw ({
            message: "Error Upload",
          })
        }
      } catch (error) {
        next(error)
      };
    })

  }  static async uploadSide(req, res, next) {
    console.log('<<<< masuukkkk side')
    
    cloudinary.uploader.upload(req.file.path, async (err, image) => {
        try {
            if (!err) {
          console.log('>>>> MASUK CLOUDI side')
          console.log("* " + image.secure_url);
          // res.status(201).json({
          //   message: "File Uploaded",
          //   data: newData
          // })
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
}

module.exports = UploadImgController