const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth/auth')
const {bookValidator, commentValidator} = require('../middlewares/validators/bookValidator')
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  like,
  unLike,
  addComment,
  deleteComment
} = require('../controllers/bookController')

router.route('/').get(auth, getBooks).post([auth, bookValidator], createBook)
router.route('/:bookId').get(auth, getBook).delete(auth, deleteBook)
router.route('/like/:bookId').put(auth, like)
router.route('/unlike/:bookId').put(auth, unLike)
router.route('/comments/:bookId').post([auth, commentValidator], addComment)
router.route('/comments/:bookId/:commentId').delete(auth, deleteComment)

module.exports = router