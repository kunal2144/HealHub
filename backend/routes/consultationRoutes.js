const express = require('express')
const {
  getConsultations,
  bookConstulation
} = require('../controllers/consultationController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/get-consultations', protect, getConsultations)
router.post('/book-consultation', protect, bookConstulation)

module.exports = router
