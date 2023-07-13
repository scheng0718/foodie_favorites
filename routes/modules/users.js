const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login', { emailInput: req.flash('emailInput')})
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', 
  failureRedirect: '/users/login', 
  failureFlash: true
}))
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Email and Password are required.'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password are not matched.'})
  }
  if (errors.length) {
    return res.render('signup', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'Email address has been registered!'})
        return res.render('signup', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } 
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({
            name,
            email,
            password: hash
          })
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
        })
    })
    .catch(error => console.log(error))
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have signed out successfully!')
  res.redirect('/users/login')
})

module.exports = router