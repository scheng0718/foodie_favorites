const express = require('express')
const router = express.Router()
//引用 Restaurant Model 
const Restaurant = require('../../models/restaurant')

// 定義首頁路由：瀏覽全部餐廳
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', {restaurant}))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router