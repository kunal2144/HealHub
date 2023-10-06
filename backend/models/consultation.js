const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      refPath: 'model'
    },
    category: {
      type: String,
      required: true
    },
    // doctor_id: { type: String, required: true, trim: true },
    start_datetime: { type: Date, required: true, trim: true },
    end_datetime: { type: Date, trim: true },
    // chat_id: { type: String, required: true, trim: true },
    model: {
      type: String,
      required: true,
      enum: ['Patient', 'FamilyMember']
    }
  },
  {
    timestamps: true
  }
)

const Consultation = mongoose.model('Consultation', consultationSchema)

module.exports = Consultation
