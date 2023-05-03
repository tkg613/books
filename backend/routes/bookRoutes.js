const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth/auth')
const {bookValidator} = require('../middlewares/validators/bookValidator')
const {
  getBooks,
  getBook,
  createBook,
  deleteBook
} = require('../controllers/bookController')

router.route('/').get(auth, getBooks).post([auth, bookValidator], createBook)
router.route('/:bookId').get(auth, getBook).delete(auth, deleteBook)

module.exports = router