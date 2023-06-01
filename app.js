// Load express modules
const express = require('express')
// Create an instance to use express
const app = express()
// Define server-related variables
const port = 3000
// Load mongoose
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// Load express-handlebars
const exphbs = require('express-handlebars')
// Load JSON file
const restaurantList = require('./restaurant.json')
// Set up db
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
// Use template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Set view engine as handlebars
app.set('view engine', 'handlebars')
// Use static file
app.use(express.static('public'))

// Set up the route and response body 
app.get('/', (req, res) => {
  res.render('index', {restaurant: restaurantList.results})
})
// Set up /restaurants/params and response body
app.get('/restaurants/:id', (req, res) => {
  // console.log('req.params.id', req.params.id)
  // 使用到解構賦值的寫法，從 req.params 中提取名為 id的屬性再賦值
  const {id} = req.params
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  res.render('show', {restaurant})
})
// Set up /search route
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  // console.log('req.query.keyword', req.query.keyword)
  // Use trim() and regex to remove the spaces.
  const keyword = req.query.keyword.trim().replace(/\s/g, '')
  const restaurant = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', {restaurant, keyword})
})

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})