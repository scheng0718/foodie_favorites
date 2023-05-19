// Load express modules
const express = require('express')
// Create an instance to use express
const app = express()
// Define server-related variables
const port = 3000

// Set up the route and response body 
app.get('/', (req, res) => {
  res.send('This is the first server running by Express!')
})

// The server is listening and running at the http://localhost:3000
app.listen(port, () => {
  console.log(`The server is listening and running at http://localhost:${port}`)
})