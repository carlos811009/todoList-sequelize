const express = require('express')
const { Model } = require('sequelize')
const router = express.Router()




const db = require('../../models')
const Todo = db.Todo
const User = db.User


router.get('/', (req, res) => {
  const id = req.user.id
  return Todo.findAll({
    where: { UserId: id },
    raw: true,
    nest: true
  })
    .then((todos) => {
      res.render('index', { todos })
    })

    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router