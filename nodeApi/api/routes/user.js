const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

router.post('/login', (req, res, next) => {
  userModel.find({ email: req.body.email }).exex()
    .then(user => {
      if (user.length < 1) res.status(401).json({ message: "Error" })

      bcrypt.compare(req.body.password, user[0].password, (err, call) => {
        if (err) return res.status(401).json({ message: "Error" })

        if (call) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          },
            process.env.INT_KEY,
            {
              expiresIn: '1h'
            })

          return res.status(200).json({
            message: 'Auth complete',
            token: token
          })
        }

        return res.status(200).json({ message: 'Auth complete' })
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

module.exports = router