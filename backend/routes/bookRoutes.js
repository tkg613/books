const express = require('express')
const router = express.Router()

// @route  GET api/books
// @desc   Test
// @access Public
router.get('/', (req, res) => res.send('Book route'))

module.exports = router