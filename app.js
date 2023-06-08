// Load express modules
const express = require('express')
// Load express-handlebars
const exphbs = require('express-handlebars')
// Load mongoose
const mongoose = require('mongoose')
// Load method override
const methodOverride = require('method-override')
const routes = require('./routes')

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
app.use(routes)
// Set up the root route and render through template engine 

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

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})