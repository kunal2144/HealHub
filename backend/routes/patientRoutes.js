const express = require('express')
const {
  registerPatient,
  authPatient,
  allPatients,
  updateProfile,
  getMembers,
  addMember,
  deleteMember
} = require('../controllers/patientControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerPatient).get(protect, allPatients)
router.post('/login', authPatient)
router.post('/update-profile', protect, updateProfile)
router.post('/get-members', protect, getMembers)
router.post('/add-member', protect, addMember)
router.get('/delete-member', protect, deleteMember)
// router.post('/update-member', protect, updateMember)

module.exports = router
