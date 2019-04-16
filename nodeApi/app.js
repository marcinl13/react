const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productsRouts = require('./api/routes/products')
const ordersRouts = require('./api/routes/orders')

mongoose.connect('mongodb+srv://marlepo:' + process.env.MONGO_ATLAS_PW + '@cluster0-fxgwn.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/products', productsRouts)
app.use('/orders', ordersRouts)

app.use((req, res, next) => {
  const error = new Error('brak strony');
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  error.status=error.status || 500
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app