const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth/auth')
const {getUser} = require('../controllers/authController')

// @route  GET api/auth
// @desc   Test
// @access Public
router.get('/', auth, getUser)

module.exports = router