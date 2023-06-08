// Load Restaurant
const Restaurant = require('../restaurant')
// Load JSON file 用 require(../../json file) 將檔案載入
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose'
)
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