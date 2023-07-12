// Load express modules
const express = require('express')
// Load express-handlebars
const exphbs = require('express-handlebars')
// Load method override
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
const routes = require('./routes')
// mongoose 只需要被執行，不需要接合任何參數
require('./config/mongoose')
// Create an instance to use express
const app = express()
// Define server-related variables
const port = 3000
// Use template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
// Set view engine as handlebars
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// initialize and use passport
app.use(passport.initialize())
app.use(passport.session())
// Use static file
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  // console.log(res)
  next()
})
app.use(routes)
// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})