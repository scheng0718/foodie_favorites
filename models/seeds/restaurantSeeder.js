const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Load Restaurant
const Restaurant = require('../restaurant')
const User = require('../user')
// Load JSON file 用 require(../../json file) 將檔案載入
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')
const SEED_USER = [{
  name: 'User1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'User2',
  email: 'user2@example.com',
  password: '12345678'
}]
// 用 async 關鍵字表示非同步函式
db.once('open', async () => {
  try {
    console.log('Running Restaurant Seeder script!')
    for (let i = 0; i < SEED_USER.length; i++) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(SEED_USER[i].password, salt)
      const user = await User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      })
      // 在現有 restaurant 資料中加入新的屬性 userId，回傳新的物件 
      const restaurants = restaurantList.slice(i * 3, (i + 1) * 3).map(restaurant => ({
        ...restaurant,
        userId: user._id
      }))
      // 用 await 關鍵字等首三筆資料插入到資料庫之後，再進行下一次迴圈
      await Restaurant.insertMany(restaurants)
    }
    console.log('Restaurant Seeder done!')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})






