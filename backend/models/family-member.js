const mongoose = require('mongoose')

const familyMemberSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    date_of_birth: { type: Date },
    gender: { type: String, trim: true },
    blood_group: { type: String, trim: true }
  },
  {
    timestamps: true
  }
)

const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema)

module.exports = FamilyMember
