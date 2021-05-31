if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const job = require('./helper/cron')
const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app