const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email'
},(username, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'The email is not registered yet.'})
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect email or password.'})
      }
      return done(null, user)
    })
    .catch(error => console.log(error))
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(error => console.log(error))
})
module.exports = passport