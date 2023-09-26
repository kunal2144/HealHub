const express = require('express')
const { getOneDisease } = require('../controllers/diseaseControllers')

const router = express.Router()

router.route('/today').get(getOneDisease)

module.exports = router
