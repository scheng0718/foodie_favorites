const express = require('express')
const router = express.Router()
//引用 Restaurant Model 
const Restaurant = require('../../models/restaurant')

router.get('/:sort', (req, res) => {
  const sortingOption = req.params.sort
  let sortQuery = {}
  if (sortingOption === 'nameAsc') {
    sortQuery = {name_en: 1}
  } else if (sortingOption === 'nameDesc') {
    sortQuery = {name_en: -1}
  } else if (sortingOption === 'category') {
    sortQuery = {category: 1}
  } else if (sortingOption === 'location') {
    sortQuery = {location: 1}
  }
  Restaurant
    .find()
    .lean()
    .sort(sortQuery)
    .then(restaurant => res.render('index', {restaurant}))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router