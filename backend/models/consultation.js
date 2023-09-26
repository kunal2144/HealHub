const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema(
  {
    patient_id: { type: String, required: true, trim: true },
    doctor_id: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true, trim: true },
    end_time: { type: String, required: true, trim: true },
    chat_id: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['completed', 'missed', 'scheduled'],
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Consultation = mongoose.model('Consultation', consultationSchema)

module.exports = Consultation
