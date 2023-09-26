const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const Patient = require('../models/patient')
const Consultation = require('../models/consultation')

const registerPatient = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  const patientExists = await Patient.findOne({ email })

  if (patientExists) {
    res.status(400)
    throw new Error('Patient already exists')
  }

  const patient = await Patient.create({
    first_name,
    last_name,
    email,
    password
  })

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      firstName: patient.first_name,
      lastName: patient.last_name,
      email: patient.email,
      token: generateToken(patient._id)
    })
  } else {
    res.status(500)
    throw new Error('Failed to create patient')
  }
})

const authPatient = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const patient = await Patient.findOne({ email })

  if (patient && (await patient.matchPassword(password))) {
    res.json({
      _id: patient._id,
      firstName: patient.first_name,
      lastName: patient.last_name,
      email: patient.email,
      token: generateToken(patient._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const allPatients = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [{ email: { $regex: req.query.search, $options: 'i' } }]
      }
    : {}

  const patients = await Patient.find(keyword).find({
    _id: { $ne: req.user._id }
  })

  res.send(patients)
})

const getConsultations = asyncHandler(async (req, res) => {
  const { patient } = req

  try {
    const consultations = await Consultation.find({
      patient_id: patient._id
    })

    res.json(consultations)
  } catch (error) {
    res.status(500)
    throw new Error('Failed to get consultations')
  }
})

module.exports = { registerPatient, authPatient, allPatients, getConsultations }
