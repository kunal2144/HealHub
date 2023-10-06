const asyncHandler = require('express-async-handler')
const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')

const getDiseases = asyncHandler(async (req, res) => {
  try {
    const csvFilePath = path.resolve(
      __dirname,
      '../assets/databases/diseases.csv'
    )
    const readStream = fs.createReadStream(csvFilePath)

    let headers = null
    const allRows = []

    readStream
      .pipe(parse({ delimiter: ',', from_line: 1 }))
      .on('data', function (row) {
        if (!headers) {
          headers = row
        } else {
          let result = {}
          for (let i = 0; i < headers.length; i++) {
            result[headers[i]] = row[i]
          }
          allRows.push(result)
        }
      })
      .on('end', function () {
        if (allRows.length === 0) {
          res.status(404).json({ error: 'No rows found' })
        } else {
          res.json(allRows)
        }
      })
      .on('error', function (error) {
        res.status(500).json({ error: 'Internal server error' })
      })
  } catch (error) {
    res.status(404).json({ error: 'File not found' })
  }
})

module.exports = { getDiseases }
