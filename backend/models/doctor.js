const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor
