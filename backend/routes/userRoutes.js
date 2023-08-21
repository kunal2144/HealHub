const express = require('express')
const { verifyToken } = require('../controllers/userControllers')

const router = express.Router()

router.post('/verify-token', verifyToken)

module.exports = router
