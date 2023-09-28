const asyncHandler = require('express-async-handler')
const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')

const getOneDisease = asyncHandler(async (req, res) => {
  var now = new Date()
  var start = new Date(now.getFullYear(), 0, 0)
  var diff = now - start
  var oneDay = 1000 * 60 * 60 * 24
  var rowToRetrieve = (Math.floor(diff / oneDay) % 21) + 1
  let rowIndex = 0

  try {
    const csvFilePath = path.resolve(
      __dirname,
      '../assets/databases/diseases.csv'
    )
    const readStream = fs.createReadStream(csvFilePath)

    let headers = null

    readStream
      .pipe(parse({ delimiter: ',', from_line: 1 }))
      .on('data', function (row) {
        if (rowIndex === 0) headers = row
        else if (rowIndex === rowToRetrieve) {
          let result = {}
          for (let i = 0; i < headers.length; i++) {
            result[headers[i]] = row[i]
          }
          res.json(result)
          readStream.close()
        }
        rowIndex++
      })
      .on('end', function () {
        if (rowIndex < rowToRetrieve) {
          res.status(404).json({ error: 'Row not found' })
        }
      })
      .on('error', function (error) {
        res.status(500).json({ error: 'Internal server error' })
      })
  } catch (error) {
    res.status(404).json({ error: 'File not found' })
  }
})

module.exports = { getOneDisease }
