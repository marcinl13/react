const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res, next) => {

  userModel.find({ email: req.body.email }).exex()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "User already exists" })
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new userModel({
              _id: new mongoose.Types.ObjectId,
              email: req.body.email,
              password: hash
            })
            user.save()
              .then(result => {
                res.status(201).json({ message: 'User Created' })
              })
              .catch(err => {
                res.status(500).json({ error: err })
              })
          }
        })
      }
    })
})

router.delete('/:userId', (req, res, next) => {
  userModel.deleteOne({ _id: req.pharams.userId }).then(result => {
    res.status(200).json({ message: 'User Deleted' })
  }).catch(err => {
    res.status(500).json({ error: err })
  })
})

module.exports = router