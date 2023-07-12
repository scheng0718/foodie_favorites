const express = require('express')
const router = express.Router()
//引用 Restaurant Model 
const Restaurant = require('../../models/restaurant')

// 搜尋特定餐廳
router.get('/', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  // console.log('req.query.keyword', req.query.keyword)
  // Use trim() and regex to remove the spaces.
  const keyword = req.query.keyword.trim().replace(/\s/g, '')
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurant => {
      const filteredRestaurant = restaurant.filter(data => data.name.toLowerCase().includes(keyword.toLowerCase()) || data.name_en.toLowerCase().includes(keyword.toLowerCase()) || data.category.toLowerCase().includes(keyword.toLowerCase()))

      res.render('index', {restaurant: filteredRestaurant, keyword})
    })
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router