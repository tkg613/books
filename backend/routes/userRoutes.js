const express = require('express')
const router = express.Router()
const {validateUser} = require('../middlewares/validators/userValidator')
const {registerUser} = require('../controllers/userController')

// @route  POST api/users
// @desc   Register user
// @access Public
router.route('/').post(validateUser, registerUser)

module.exports = router