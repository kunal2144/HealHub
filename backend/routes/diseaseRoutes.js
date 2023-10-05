const express = require('express')
const {
  getOneDisease,
  getDiseases
} = require('../controllers/diseaseControllers')

const router = express.Router()

router.route('/today').get(getOneDisease)
router.route('/').get(getDiseases)

module.exports = router
