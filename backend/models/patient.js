const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const patientSchema = new mongoose.Schema(
  {
    // first_name: { type: String, required: true, trim: true },
    // last_name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true }
    // username: { type: String, required: true, trim: true },
    // date_of_birth: { type: Date, required: true },
    // age: { type: Number, required: true },
    // gender: { type: String, trim: true },
    // phone_no: { type: String, unique: true, required: true, trim: true },
    // family_id: { type: Number, ref: 'Family' },
    // aadhar_number: { type: String, trim: true },
    // address_id: { type: Number, ref: 'Address' }
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
