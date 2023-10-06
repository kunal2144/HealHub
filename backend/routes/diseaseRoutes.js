const express = require('express')
const { getDiseases } = require('../controllers/diseaseControllers')

const router = express.Router()

router.route('/').get(getDiseases)

module.exports = router
