const express = require('express')
const router = express.Router()
//引用 Restaurant Model 
const Restaurant = require('../../models/restaurant')

router.get('/:sort', (req, res) => {
  const sortingOption = req.params.sort
  const userId = req.user._id
  let sortQuery = {}
  if (sortingOption === 'nameAsc') {
    sortQuery = {name_en: 1}
  } else if (sortingOption === 'nameDesc') {
    sortQuery = {name_en: -1}
  } else if (sortingOption === 'category') {
    sortQuery = {category: 1}
  } else if (sortingOption === 'location') {
    sortQuery = {location: 1}
  } else if (sortingOption === 'rating') {
    sortQuery = {rating: -1}
  }
  Restaurant
    .find({ userId })
    .lean()
    .sort(sortQuery)
    .then(restaurant => res.render('index', {restaurant}))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router