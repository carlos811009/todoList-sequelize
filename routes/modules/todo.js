const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

router.use(express.urlencoded({ extended: true }))
router.use(methodOverride('_method'))


const db = require('../../models')
const Todo = db.Todo


router.get('/addNew', (req, res) => {
  res.render('addNew')
})

router.post('/', (req, res) => {
  console.log(req.user)
  const id = req.user.id
  return Todo.create({
    name: req.body.name,
    UserId: id
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))

})

router.put('/:id', (req, res) => {
  const { name, isDone } = req.body
  console.log(req.body)
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' //ture
      todo.save()
    })
    .then(() => res.redirect('/'))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.destroy({ where: { id: id } })
    .then(() => res.redirect('/'))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})



module.exports = router