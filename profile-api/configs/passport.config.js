const passport = require('passport')
const User = require('../models/user.model')
const localStrategy = require('passport-local').Strategy

passport.serializeUser((user,next) => {
  next(null,user.id)
})

passport.deserializeUser((id,next) => {
  User.findById(id)
    .then(user => next(null,user))
    .catch(next)
})

passport.use('auth-local', new localStrategy({
  usernameField : 'email',
  passwordField: 'password'
}, (email,password,next) => {
  User.findOne({ email })
    .then(user => {
      if(!user) {
        next(null,false,'Invalid email or password')
      } else {
        return user.checkPassword(password)
          .then( match => {
            if(!match) {
              next(null, false, 'Invalid email or password')
            } else {
              next(null,user)
            }
          })
      }
    })
    .catch(next)
}))


