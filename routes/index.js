const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')
// 將網址結構符合字串導向模組
router.use('/users', users)
router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/sort', authenticator, sort)
router.use('/', authenticator, home)

module.exports = router