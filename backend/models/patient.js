const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const patientSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    date_of_birth: { type: Date },
    gender: { type: String, trim: true },
    phone_no: { type: String, trim: true },
    blood_group: { type: String, trim: true },
    family_members: { type: Array, default: [] }
  },
  {
    timestamps: true
  }
)

patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

patientSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
