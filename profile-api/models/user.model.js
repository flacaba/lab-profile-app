const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
const CAMPUS_OPTIONS = ['Madrid', 'Barcelona', 'Miami', 'Paris', 'Berlin', 'Amsterdam', 'México', 'Sao Paulo']
const COURSE_OPTIONS = ['webDev','UX/UI','Data Analytics']
const SALT_FACTOR = 10

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match : [EMAIL_PATTERN, 'Invalid email pattern']
  },
  password : {
    type:String,
    match: [PASSWORD_PATTERN, 'Invalid password pattern']
  },
  campus : {
    type: String,
    enum: CAMPUS_OPTIONS
  },
  course : {
    type: String,
    enum: COURSE_OPTIONS
  },
  avatarUrl : String
},{
  timestamps : true,
  toJSON: {
    virtuals : true,
    transform: (doc,ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.__v
      delete ret.password
      return ret
    }
  }
})

userSchema.pre('save', function (next){
  const user = this

  if (!user.isModified('password')) {
    next()
  } else {
    bcrypt.genSalt(SALT_FACTOR)
    .then(salt => {
      return bcrypt.hash(user.password, salt)
        .then(hash => { 
          user.password= hash
          next()
        })
    })
    .catch(error => next(error))
  }

})

userSchema.methods.checkPassword = function (password){
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User',userSchema)

module.exports = User