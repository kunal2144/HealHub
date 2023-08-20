const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const patientRoutes = require('./routes/patientRoutes.js')
const Patient = require('./models/patient')

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use('/api/patient', patientRoutes)

app.post('/api/verify-token', async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
  const patient = await Patient.findById(decoded.id).select('-password')
  return res.json({ valid: patient ? true : false })
})

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on port ${process.env.PORT || 5000}`.yellow.bold
  )
})
