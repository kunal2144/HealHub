const express = require('express')
const {
  registerPatient,
  authPatient,
  allPatients
} = require('../controllers/patientControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerPatient).get(protect, allPatients)
router.post('/login', authPatient)

module.exports = router
