const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer')
const checkAuth = require('../check-auth')

const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, './uploads/')
  },
  filename: function (req, file, call) {
    call(null, new Date().toISOString().replace(/:/g, '') + file.originalname)
  }
})

const fileFilter = (req, file, call) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
    call(null, true)
  else
    call(null, false)
}

const upload = multer({
  storage: storage, limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

const Product = require('../models/product')


router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
      console.log(docs)
      if (docs.length >= 1) {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              nazwa: doc.name,
              cena: doc.price,
              obrazek: doc.productImage,
              id: doc._id,
              request: {
                type: 'GET',
                url: 'http://localhost:5000/products/' + doc._id
              }
            }
          })
        }
        res.status(200).json(response)
      } else {
        res.status(404).json({ message: 'Brak produktów' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', upload.single('productImage'), checkAuth, (req, res, next) => {
  console.log(req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  })
  product.save()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Dodanie produktu',
        createdProduct: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })

})

router.get('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("Z bazy: " + doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'Niepoprawne ID' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.patch('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId
  Product.update({ _id: id }, {
    $set: {
      name: req.body.name,
      price: req.body.price
    }
  })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router

