const bcrypt = require('bcryptjs')
const User = require('../models/User')

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

    res.status(201).json(user)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }

}
module.exports = {
  registerUser
}