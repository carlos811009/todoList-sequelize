const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const app = express()
const PORT = 3000

const usePassport = require('./config/passport')

const routes = require('./routes')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
usePassport(app)

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})