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
// Load Restaurant model
const Restaurant = require('./models/restaurant')
// Set up db
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
// Use template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
// Set view engine as handlebars
app.set('view engine', 'hbs')
// Use static file
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// Set up the root route and render through template engine 
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', {restaurant}))
    .catch(error => console.error(error))
})
app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurant/new', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en  
  const category = req.body.category  
  const image = req.body.image  
  const location = req.body.location  
  const phone = req.body.phone  
  const google_map = req.body.google_map  
  const rating = req.body.rating  
  const description = req.body.description  
  return Restaurant.create({name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Set up /restaurants/params and response body
app.get('/restaurant/:id', (req, res) => {
  // console.log('req.params.id', req.params.id)
  // 使用到解構賦值的寫法，從 req.params 中提取名為 id的屬性再賦值
  const {id} = req.params
  // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  // res.render('show', {restaurant})
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant}))
    .catch(error => console.log(error))  
})
app.get('/restaurant/:id/edit', (req, res) => {
  // console.log('req.params.id', req.params.id)
  // 使用到解構賦值的寫法，從 req.params 中提取名為 id的屬性再賦值
  const {id} = req.params
  // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  // res.render('show', {restaurant})
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.log(error))  
})
app.post('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en  
  const category = req.body.category  
  const image = req.body.image  
  const location = req.body.location  
  const phone = req.body.phone  
  const google_map = req.body.google_map  
  const rating = req.body.rating  
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error)) 
})
app.post('/restaurant/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Set up /search route
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  // console.log('req.query.keyword', req.query.keyword)
  // Use trim() and regex to remove the spaces.
  const keyword = req.query.keyword.trim().replace(/\s/g, '')
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } }, // 使用正則表達式進行模糊搜尋，不區分大小寫
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .then(restaurant => res.render('index', {restaurant, keyword}))
    .catch(error => console.log(error))
  // const restaurant = Restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  // res.render('index', {restaurant, keyword})
})

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})