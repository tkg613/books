const Profile = require('../models/Profile')
const User = require('../models/User')


// @route  GET api/profile/me
// @desc   Get current user profile
// @access Private
const getCurrentUser = async function(req, res) {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name'])
    if (!profile) {
      return res.status(400).json({msg: 'No profile found.'})
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @route  GET api/profile/
// @desc   Get all profiles
// @access Public
const getProfiles = async function(req, res) {
  try {
    const profiles = await Profile.find({}).populate('user', ['name'])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @route  GET api/profile/user/:userId
// @desc   Get profile by user id
// @access Public
const getProfile = async function(req, res) {
  try {
    const profile = await Profile.findOne({user: req.params.userId}).populate('user', ['name'])
    if (!profile) {
      return res.status(400).json({msg: 'Profile not found.'})
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'objectId') {
      return res.status(400).json({msg: 'Profile not found.'})
    }
    res.status(500).send('Server Error')
  }
}

// @route  POST api/profile/
// @desc   Create or update user profile
// @access Private
const createProfile = async function(req, res) {
  
    const {
      books,
      bio,
      status,
      youtube,
      twitter, 
      facebook,
      linkedIn,
      instagram
    } = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id

    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (books) {
      profileFields.books = books.split(',').map(book => book.trim())
    }

    // Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedIn) profileFields.social.linkedIn = linkedIn
    if (instagram) profileFields.social.instagram = instagram

  try {

    let profile = await Profile.findOne({user: req.user.id})
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
          {user: req.user.id}, 
          {$set: profileFields}, 
          {new: true}
        )

        res.json(profile)
    }

    // Create
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @route  DELETE api/profile/
// @desc   Delete profile, user, and posts
// @access Private
const deleteUserProfile = async function(req, res) {
  try {
    // Remove profile
    await Profile.findOneAndRemove({user: req.user.id})
    // Remove User
    await User.findOneAndRemove({_id: req.user.id})
    if (!profile) {
      return res.status(400).json({msg: 'Profile not found.'})
    }
    res.json({msg: 'User deleted'})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
const addExperience = async function(req, res) {
   
  const {title, from, to, current, description} = req.body

  const newExp = {
    title,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({user: req.user.id})
    
    profile.experience.unshift(newExp)
    
    await profile.save()

    res.json(profile)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }

}

// @route  DELETE api/profile/experience/:expId
// @desc   Delete profile experience
// @access Private
const deleteExperience = async function(req, res) {
  try {

    const profile = await Profile.findOne({user: req.user.id})
    
    // Get remove index and delete
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId)
    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}


module.exports = {
  getCurrentUser,
  getProfile,
  getProfiles,
  createProfile,
  deleteUserProfile,
  addExperience,
  deleteExperience
}