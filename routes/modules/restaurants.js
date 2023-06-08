const express = require('express')
const router = express.Router()
//引用 Restaurant Model 
const Restaurant = require('../../models/restaurant')
// 取得新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
// 新增餐廳
router.post('/', (req, res) => {
  // create() 方法中直接傳入 req.body
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  // console.log('req.params.id', req.params.id)
  // 使用到解構賦值的寫法，從 req.params 中提取名為 id的屬性再賦值
  const {id} = req.params
  // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  // res.render('show', {restaurant})
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant}))
    .catch(error => console.log(error))  
})
// 取得編輯餐廳頁面
router.get('/:id/edit', (req, res) => {
  // console.log('req.params.id', req.params.id)
  // 使用到解構賦值的寫法，從 req.params 中提取名為 id的屬性再賦值
  const {id} = req.params
  // const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === id)
  // res.render('show', {restaurant})
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.log(error))  
})
// 編輯更新餐廳資訊
router.put('/:id', (req, res) => {
  // 在findByIdAndUpdate 直接傳進 id 和 req.body 會直接更新儲存
  const {id} = req.params
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error)) 
})
// 刪除餐廳 直接使用 findByIdAndDelete()
router.delete('/:id', (req, res) => {
  const {id} = req.params
  return Restaurant.findByIdAndDelete(id)
    // .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router