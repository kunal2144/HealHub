const express = require('express')
const {
  registerPatient,
  authPatient,
  allPatients,
  getConsultations
} = require('../controllers/patientControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerPatient).get(protect, allPatients)
router.post('/login', authPatient)
router.post('/get-consultations', protect, getConsultations)

module.exports = router
