const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema(
  {
    patient_id: { type: String, required: true, trim: true },
    doctor_id: { type: String, required: true, trim: true },
    start_datetime: { type: Date, required: true, trim: true },
    end_datetime: { type: Date, trim: true },
    chat_id: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
)

const Consultation = mongoose.model('Consultation', consultationSchema)

module.exports = Consultation
