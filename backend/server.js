const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const patientRoutes = require('./routes/patientRoutes.js')

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use('/api/patient', patientRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on port ${process.env.PORT || 5000}`.yellow.bold
  )
})
