const Book = require('../models/Book')
const User = require('../models/User')
const Profile = require('../models/Profile')


// @route  GET api/books
// @desc   Get all books
// @access Private
const getBooks = async function(req, res) {
  
  try {

    const books = await Book.find().sort({date: -1})
    res.json(books)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }

}

// @route  GET api/books/:bookId
// @desc   Get book by id
// @access Private
const getBook = async function(req, res) {
  
  try {

    const book = await Book.findById(req.params.bookId)

    if (!book) {
      return res.status(404).json({msg: 'Post not found.'})
    }

    res.json(book)

  } catch (error) {
    console.error(error.message)
    if (error.kind == 'objectId') {
      return res.status(400).json({msg: 'Book not found.'})
    }
    res.status(500).send('Server Error')
  }

}

// @route  POST api/books
// @desc   Create a book
// @access Private
const createBook = async function(req, res) {

  try {
    const user = await User.findById(req.user.id).select('-password')

    const newBook = new Book({
      title: req.body.title,
      description: req.body.description,
      author: user.name,
      user: req.user.id
    })

    await newBook.save()

    res.json(newBook)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
  
}

// @route  DELETE api/books/bookId
// @desc   delete a book
// @access Private
const deleteBook = async function(req, res) {

  try {
    
    const book = await Book.findById(req.params.bookId)

    if (!book) {
      return res.status(404).send('Book not found.')
    }

    // Check user
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'User not authorized.'})
    }

    await Book.deleteOne({id: book.id})

    res.json({msg: 'Book removed.'})

  } catch (error) {
    console.error(error.message)
    if (error.kind == 'objectId') {
      return res.status(400).json({msg: 'Book not found.'})
    }
    res.status(500).send('Server Error')
  }

}

// @route  PUT api/books/like/:bookId
// @desc   Like a book
// @access Private
const like = async function(req, res) {

  try {
    const book = await Book.findById(req.params.bookId)

    // Check if book has already been liked
    if (book.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({msg: 'Book already liked.'})
    } 

    book.likes.unshift({user: req.user.id})
    await book.save()

    res.json(book.likes)

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }

}

// @route  PUT api/books/unlike/:bookId
// @desc   Unlike a book
// @access Private
const unLike = async function(req, res) {

  try {
    const book = await Book.findById(req.params.bookId)

    // Check if book has already been liked
    if (book.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({msg: 'Book has not yet been liked.'})
    } 

    // Get remove index
    const removeIndex = book.likes.map(like => like.user.toString()).indexOf(req.user.id)
    book.likes.splice(removeIndex, 1)

    await book.save()

    res.json(book.likes)

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }

}

// @route  POST api/books/comment/:bookId
// @desc   Comment on a book
// @access Private
const addComment = async function(req, res) {

  try {
    const user = await User.findById(req.user.id).select('-password')

    const book = await Book.findById(req.params.bookId)

    const newComment = {
      text: req.body.text,
      nane: user.name,
      user: req.user.id
    }

    book.comments.unshift(newComment)

    await book.save()

    res.json(book.comments)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
  
}

// @route  DELETE api/books/comments/:bookId/:commentId
// @desc   Delete comment
// @access Private
const deleteComment = async function(req, res) {
  
  try {

    const book = await Book.findById(req.params.bookId)

    // Get comment of book
    const comment = book.comments.find(comment => comment.id === req.params.commentId)

    // Check comment exists
    if (!comment) {
      return res.status(404).json({message: 'Comment not found.'})
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'User not authorized.'})
    }

     // Get remove index
     const removeIndex = book.comments.map(comment => comment.id.toString()).indexOf(req.params.commentId)
     book.comments.splice(removeIndex, 1)
 
     await book.save()

    res.json(book.comments)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
  
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  like,
  unLike,
  addComment,
  deleteComment
}