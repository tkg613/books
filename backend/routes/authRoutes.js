const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth/auth')
const {getUser, login} = require('../controllers/authController')
const {loginValidator} = require('../middlewares/validators/loginValidator')


router.get('/', auth, getUser).post('/', loginValidator, login)

module.exports = router