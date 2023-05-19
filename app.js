// Load express modules
const express = require('express')
// Create an instance to use express
const app = express()
// Define server-related variables
const port = 3000
// Load express-handlebars
const exphbs = require('express-handlebars')
// Load JSON file
const restaurantList = require('./restaurant.json')

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
// Set up /restaurants/1 and response body
// Params
app.get('/restaurants/:id', (req, res) => {
  console.log('req.params.id', req.params.id)
  const id = req.params.id
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  res.render('show', {restaurant})
})
// Set up /search route
app.get('/search', (req, res) => {
  // console.log('req.query.keyword', req.query.keyword)
  // Use trim() and regex to remove the spaces.
  const keyword = req.query.keyword.trim().replace(/\s/g, '')
  const restaurant = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', {restaurant, keyword})
})

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})