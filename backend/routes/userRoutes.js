const express = require('express')
const router = express.Router()
const {registrationValidator} = require('../middlewares/validators/registrationValidator')
const {registerUser} = require('../controllers/userController')

// @route  POST api/users
// @desc   Register user
// @access Public
router.route('/').post(registrationValidator, registerUser)

module.exports = router