const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Patient = require('../models/patient')

const verifyToken = asyncHandler(async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
    const patient = await Patient.findById(decoded.id).select('-password')
    res.json({ valid: patient ? true : false })
  } catch (err) {
    res.json({ valid: false })
  }
})

module.exports = { verifyToken }
