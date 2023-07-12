const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
},(req, email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        // console.log(req.body.email)
        req.flash('emailInput', req.body.email)
        return done(null, false, req.flash('warning_msg', 'The email is not registered yet.'))
      }
      if (user.password !== password) {
        req.flash('emailInput', req.body.email)
        return done(null, false, req.flash('warning_msg', 'Incorrect email or password.'))
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