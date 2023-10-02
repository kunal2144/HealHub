const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Patient = require('../models/patient')

const verifyToken = asyncHandler(async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
    const patient = await Patient.findById(decoded.id).select('-password')

    res.json({
      token: req.body.token,
      firstName: patient.first_name,
      lastName: patient.last_name,
      email: patient.email,
      dob: patient.date_of_birth?.toISOString().split('T')[0],
      phoneNumber: patient.phone_no,
      age: patient.age,
      bloodGroup: patient.blood_group,
      gender: patient.gender,
      familyMembers: patient.family_members
    })
  } catch (err) {
    res.json({ error: 'Invalid token' })
  }
})

module.exports = { verifyToken }
