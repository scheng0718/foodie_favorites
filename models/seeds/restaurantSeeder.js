// Load mongoose
const mongoose = require('mongoose')
// Load Restaurant
const Restaurant = require('../restaurant')
// Load JSON file 用 require(../../json file) 將檔案載入
const restaurantList = require('../../restaurant.json').results

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
  console.log('Running restaurantSeeder script!')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(error => console.log(error))  
  // const restaurants = restaurantList.results
  // for (let restaurant of restaurants) {
  //   Restaurant.create({
  //     id: restaurant.id,
  //     name: restaurant.name,
  //     name_en: restaurant.name_en,
  //     category: restaurant.category,
  //     image: restaurant.image,
  //     location: restaurant.location,
  //     phone: restaurant.phone,
  //     google_map: restaurant.google_map,
  //     rating: restaurant.rating,
  //     description: restaurant.description,
  //   })  
  // }
})