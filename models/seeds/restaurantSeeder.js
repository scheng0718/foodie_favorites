const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Load Restaurant
const Restaurant = require('../restaurant')
const User = require('../user')
// Load JSON file 用 require(../../json file) 將檔案載入
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'Admin',
  email: 'admin@example.com',
  password: '12345678'
}

db.once('open', () => {
  console.log('Running Restaurant Seeder script!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash  
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(restaurantList.map(restaurant => {
        restaurant.userId = userId
        return Restaurant.create(restaurant)
      }))
    })
    .then(() => {
      console.log('Restaurant Seeder done!')
      process.exit()
    })
    .catch(error => console.log(error))  
})