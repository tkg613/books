const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  books: {
    type: [String]
  },
  bio: {
    type: String,
  },
  status: {
    type: String,
    required: true
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('profile', profileSchema)