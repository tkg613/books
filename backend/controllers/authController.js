const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// @route  GET api/auth
// @desc   Get current user info
// @access Private
const getUser = async function(req, res){
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
}

// @route  GET api/auth
// @desc   Login user
// @access Public
const login = async function(req, res) {

  const {email, password} = req.body

  try {

    const user = await User.findOne({email: email})
    
    if (!user) {
      res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      {expiresIn: 3600000}, 
      (error, token) => {
        if (error){
          throw error
        }
        res.json({token})
      }
    )

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }

}

module.exports = {
  getUser,
  login
}