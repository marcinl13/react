const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    Order.find().exec()
    .then(docs => {res.status(200).json(docs)})
    .catch(err => {res.status(500).json({error: err})})
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
    .then( result => {
        console.log(result)
        res.status(201).json(result)
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({error: err})
    })
    res.status(200).json({
        message: 'Zamówienie zostało dodane',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Szczegóły zamówienia',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Usunięto zamówienie',
        orderId: req.params.orderId
    })
})






module.exports = router

