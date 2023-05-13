const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @route  POST api/users
// @desc   Register user
// @access Public
const registerUser = async function(req, res) {

  const {name, email, password} = req.body

  try {

    const userExists = await User.findOne({email: email})
    
    if (userExists) {
      res.status(400).json({errors: [{msg: 'User already exists'}]})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

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
  registerUser
}