const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
  } catch (err) {
    console.error(err.red.bold)
    process.exit(1)
  }
}

module.exports = connectDB
