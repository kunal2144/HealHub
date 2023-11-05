const asyncHandler = require('express-async-handler')
const Consultation = require('../models/consultation')
const { mongo, default: mongoose } = require('mongoose')

const getConsultations = asyncHandler(async (req, res) => {
  const { patient } = req

  try {
    const upcoming = await Consultation.find({
      patient_id: { $in: [patient._id, ...patient.family_members] },
      start_datetime: { $gte: Date.now() }
    })
      .populate([{ path: 'patient_id', select: { password: 0 } }, 'doctor_id'])
      .sort({ start_datetime: 1 })

    const past = await Consultation.find({
      patient_id: { $in: [patient._id, ...patient.family_members] },
      start_datetime: { $lt: Date.now() }
    })
      .populate([{ path: 'patient_id', select: { password: 0 } }, 'doctor_id'])
      .sort({ start_datetime: 1 })

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
  const { start_datetime, user, category, doctor_id } = req.body

  let consultation = null

  try {
    if (user == 'self') {
      consultation = await Consultation.create({
        patient_id: new mongoose.Types.ObjectId(patient._id),
        start_datetime,
        category,
        doctor_id,
        model: 'Patient'
      })
    } else {
      consultation = await Consultation.create({
        patient_id: new mongoose.Types.ObjectId(user),
        start_datetime,
        category,
        doctor_id,
        model: 'FamilyMember'
      })
    }

    consultation = await Consultation.findById(consultation._id).populate([
      { path: 'patient_id', select: { password: 0 } },
      'doctor_id'
    ])

    res.json(consultation)
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error('Failed to book consultation')
  }
})

module.exports = { getConsultations, bookConstulation }
