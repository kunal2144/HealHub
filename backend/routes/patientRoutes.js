const express = require('express')
const {
  registerPatient,
  authPatient,
  allPatients,
  getConsultations,
  updateProfile,
  getMembers,
  addMember
} = require('../controllers/patientControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerPatient).get(protect, allPatients)
router.post('/login', authPatient)
router.post('/get-consultations', protect, getConsultations)
router.post('/update-profile', protect, updateProfile)
router.post('/get-members', protect, getMembers)
router.post('/add-member', protect, addMember)
// router.post('/update-member', protect, updateMember)
// router.post('/delete-member', protect, deleteMember)

module.exports = router
