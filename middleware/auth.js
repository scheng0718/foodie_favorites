// 如果有多個函式，可以同時放在物件中，更為簡潔
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}