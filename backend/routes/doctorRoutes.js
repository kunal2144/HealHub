const express = require('express')
const { getDoctors } = require('../controllers/doctorController')

const router = express.Router()

router.route('/:type').get(getDoctors)

module.exports = router
