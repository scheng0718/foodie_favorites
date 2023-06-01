// Load mongoose
const mongoose = require('mongoose')
// Load Restaurant
const Restaurant = require('../restaurant')
// Load JSON file
const restaurantList = require('/Users/sycheng/Code/foodie_favorites/restaurant.json')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Set up db
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  const restaurants = restaurantList.results
  for (let restaurant of restaurants) {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })  
  }
  console.log('mongodb done')
})