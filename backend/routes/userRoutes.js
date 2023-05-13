const express = require('express')
const router = express.Router()
const {registrationValidator} = require('../middlewares/validators/registrationValidator')
const {registerUser} = require('../controllers/userController')

router.route('/').post(registrationValidator, registerUser)

module.exports = router