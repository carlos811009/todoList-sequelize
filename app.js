const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const app = express()
const usePassport = require('./config/passport')

require('dotenv').config()



const routes = require('./routes')

const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
usePassport(app)

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})


app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})