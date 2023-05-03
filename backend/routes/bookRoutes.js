const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth/auth')
const {bookValidator} = require('../middlewares/validators/bookValidator')
const {
  getBooks,
  createBook
} = require('../controllers/bookController')

router.route('/').get(auth, getBooks).post([auth, bookValidator], createBook)

module.exports = router