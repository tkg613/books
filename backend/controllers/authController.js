const User = require('../models/User')

const getUser = async function(req, res){
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  getUser
}