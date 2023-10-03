const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const Patient = require('../models/patient')
const Consultation = require('../models/consultation')
const FamilyMember = require('../models/family-member')
const mongoose = require('mongoose')

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
      token: generateToken(patient._id),
      firstName: patient.first_name,
      lastName: patient.last_name,
      email: patient.email,
      dob: patient.date_of_birth.toISOString().split('T')[0],
      phoneNumber: patient.phone_no,
      age: patient.age,
      bloodGroup: patient.blood_group,
      gender: patient.gender,
      familyMembers: patient.family_members
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
    const upcoming = await Consultation.find({
      patient_id: patient._id,
      start_time: { $gte: Date.now() }
    })

    const past = await Consultation.find({
      patient_id: patient._id,
      end_time: { $lt: Date.now() }
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

const updateProfile = asyncHandler(async (req, res) => {
  const data = req.body
  const { patient } = req

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: patient._id },
      { $set: data },
      { new: true }
    )

    res.json({
      token: generateToken(updatedPatient._id),
      firstName: updatedPatient.first_name,
      lastName: updatedPatient.last_name,
      email: updatedPatient.email,
      dob: updatedPatient.date_of_birth.toISOString().split('T')[0],
      phoneNumber: updatedPatient.phone_no,
      bloodGroup: updatedPatient.blood_group,
      gender: updatedPatient.gender,
      familyMembers: patient.family_members
    })
  } catch (error) {
    console.log(error)
    if (error) res.status(500)
    throw new Error('Failed to update profile')
  }
})

const getMembers = asyncHandler(async (req, res) => {
  const { patient } = req

  try {
    const members = await FamilyMember.find({
      _id: { $in: patient.family_members }
    }).lean()

    updatedMembers = members.map((member) => {
      return {
        ...member,
        date_of_birth: member.date_of_birth.toISOString().split('T')[0]
      }
    })

    res.json(updatedMembers)
  } catch (error) {
    res.status(500)
    throw new Error('Failed to get members')
  }
})

const addMember = asyncHandler(async (req, res) => {
  const { patient } = req
  const { first_name, last_name, date_of_birth, gender, blood_group } = req.body

  if ((!first_name, !last_name, !date_of_birth, !gender, !blood_group))
    return res.json({ error: 'Please fill all the fields' })

  try {
    const member = await FamilyMember.create({
      first_name,
      last_name,
      date_of_birth,
      gender,
      blood_group
    })

    const idToAdd = new mongoose.Types.ObjectId(member._id)

    const updatedPatient = await Patient.findOneAndUpdate(
      {
        _id: patient._id
      },
      {
        $push: {
          family_members: idToAdd
        }
      }
    )

    res.json(member)
  } catch (error) {
    res.status(500)
    throw new Error('Failed to add member')
  }
})

const deleteMember = asyncHandler(async (req, res) => {
  const { id } = req.query
  const { patient } = req
  const idToRemove = new mongoose.Types.ObjectId(id)

  try {
    const result = await FamilyMember.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      res.status(404)
      throw new Error('Member not found')
    }

    console.log(
      await Patient.findOneAndUpdate(
        {
          _id: patient._id
        },
        {
          $pull: {
            family_members: idToRemove
          }
        },
        {
          new: true
        }
      )
    )

    res.status(200).json({ message: 'Member deleted' })
  } catch (error) {
    res.status(500)
    throw new Error('Failed to delete member')
  }
})

module.exports = {
  registerPatient,
  authPatient,
  allPatients,
  getConsultations,
  updateProfile,
  getMembers,
  addMember,
  deleteMember
}
