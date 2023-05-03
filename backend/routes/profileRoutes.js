const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth/auth')
const {
  getCurrentUser, 
  getProfile, 
  getProfiles, 
  createProfile, 
  deleteUserProfile, 
  addExperience,
  deleteExperience  
} = require('../controllers/profileController')
const {profileValidator} = require('../middlewares/validators/profileValidator')
const {experienceValidator} = require('../middlewares/validators/experienceValidator')

router.get('/me', auth, getCurrentUser)

router.route('/').get(getProfiles).post([auth, profileValidator], createProfile).delete(auth, deleteUserProfile)

router.route('/experience').put([auth, experienceValidator], addExperience)
router.route('/experience/:expId').delete(auth, deleteExperience)

router.route('/user/:userId').get(getProfile)

module.exports = router