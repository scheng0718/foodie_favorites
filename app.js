// Load express modules
const express = require('express')
// Load express-handlebars
const exphbs = require('express-handlebars')
// Load mongoose
const mongoose = require('mongoose')
// Load method override
const methodOverride = require('method-override')
// Load Restaurant model
const Restaurant = require('./models/restaurant')
// Load JSON file
// const restaurantList = require('./restaurant.json')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

// Set up db
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
// Create an instance to use express
const app = express()
// Define server-related variables
const port = 3000
// Use template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
// Set view engine as handlebars
app.set('view engine', 'hbs')
// Use static file
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// Set up the root route and render through template engine 
// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', {restaurant}))
    .catch(error => console.error(error))
})
// app.get('/filter', (req, res) => {
//   const sortingOption = req.query.sorting;
//   let sortQuery = {};

//   if (sortingOption === 'asc') {
//     sortQuery = { name_en: 1 };
//   } else if (sortingOption === 'desc') {
//     sortQuery = { name_en: -1 };
//   } else if (sortingOption === 'category') {
//     sortQuery = { category: 1 };
//   } else if (sortingOption === 'location') {
//     sortQuery = { location: 1 };
//   }

//   Restaurant.find()
//     .lean()
//     .sort(sortQuery)
//     .then(restaurant => {
//       res.render('index', { restaurant });
//     })
//     .catch(error => {
//       console.error(error);
//     });
// })
// 搜尋特定餐廳
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  // console.log('req.query.keyword', req.query.keyword)
  // Use trim() and regex to remove the spaces.
  const keyword = req.query.keyword.trim().replace(/\s/g, '')
  Restaurant.find({
    // $or: [
    //   { name: { $regex: keyword, $options: 'i' } }, // 使用正則表達式進行模糊搜尋，不區分大小寫
    //   { category: { $regex: keyword, $options: 'i' } }
    // ]
  })
    .lean()
    .then(restaurant => {
      const filteredRestaurant = restaurant.filter(data => data.name.toLowerCase().includes(keyword.toLowerCase()) || data.name_en.toLowerCase().includes(keyword.toLowerCase()) || data.category.toLowerCase().includes(keyword.toLowerCase()))

      res.render('index', {restaurant: filteredRestaurant, keyword})
    })
    .catch(error => console.log(error))
})
// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  // create() 方法中直接傳入 req.body
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
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
// 編輯餐廳頁面
app.get('/restaurants/:id/edit', (req, res) => {
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
// 更新餐廳
app.put('/restaurants/:id', (req, res) => {
  // 在findByIdAndUpdate 直接傳進 id 和 req.body 會直接更新儲存
  const {id} = req.params
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error)) 
})
// 刪除餐廳 直接使用 findByIdAndDelete()
app.delete('/restaurants/:id', (req, res) => {
  const {id} = req.params
  return Restaurant.findByIdAndDelete(id)
    // .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})