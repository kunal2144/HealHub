const asyncHandler = require('express-async-handler')
const Consultation = require('../models/consultation')
const { mongo, default: mongoose } = require('mongoose')

const getConsultations = asyncHandler(async (req, res) => {
  const { patient } = req

  try {
    const upcoming = await Consultation.find({
      patient_id: patient._id,
      start_datetime: { $gte: Date.now() }
    }).populate('patient_id')

    const past = await Consultation.find({
      patient_id: patient._id,
      start_datetime: { $lt: Date.now() }
    })

    const consultations = {
      upcoming,
      past
    }

    res.json(consultations)
  } catch (error) {
    res.status(500)
    throw new Error('Failed to get consultations')
  }
})

const bookConstulation = asyncHandler(async (req, res) => {
  const { patient } = req
  const { start_datetime, user, category } = req.body

  let consultation = null

  try {
    if (user == 'self') {
      consultation = await Consultation.create({
        patient_id: new mongoose.Types.ObjectId(patient._id),
        start_datetime,
        category,
        model: 'Patient'
      })
    } else {
      consultation = await Consultation.create({
        patient_id: new mongoose.Types.ObjectId(user),
        start_datetime,
        category,
        model: 'FamilyMember'
      })
    }

    res.json(consultation)
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error('Failed to book consultation')
  }
})

module.exports = { getConsultations, bookConstulation }
