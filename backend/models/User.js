const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name.']
  },
  email: {
    type: String,
    required: [true, 'Please add an email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password.']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', userSchema)