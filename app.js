// Load express modules
const express = require('express')
// Load express-handlebars
const exphbs = require('express-handlebars')

// Load method override
const methodOverride = require('method-override')
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