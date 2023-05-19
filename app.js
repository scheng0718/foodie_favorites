// Load express modules
const express = require('express')
// Create an instance to use express
const app = express()
// Define server-related variables
const port = 3000
// Load express-handlebars
const exphbs = require('express-handlebars')

// Use template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Set view engine as handlebars
app.set('view engine', 'handlebars')
// Use static file
app.use(express.static('public'))

// Set up the route and response body 
app.get('/', (req, res) => {
  res.render('index')
})

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})