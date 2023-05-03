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

module.exports = {
  getBooks,
  createBook
}