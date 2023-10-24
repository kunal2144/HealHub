const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const Doctor = require('../models/doctor')
const mongoose = require('mongoose')

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({
    type: req.params.type
  })
  res.json(doctors)
})

module.exports = { getDoctors }
