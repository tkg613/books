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

    res.json(book)

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

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook
}