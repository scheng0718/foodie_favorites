const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
// 將網址結構符合 /字串導向 home 模組
router.use('/', home)
// 將網址結構符合 /restaurants 字串導向 restaurants 模組
router.use('/restaurants', restaurants)
router.use('/search', search)

module.exports = router