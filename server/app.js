if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })

module.exports = app