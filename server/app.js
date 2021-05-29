require('dotenv').config()

// AWAL CRON
const { Product, Transaction } = require('./models')
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 0 * * *', async () => {
  try {
    let minus = await Transaction.findAll({ where: { status: true } })
    let updatedData = minus.map(e => {
      let newPeriod = {
        id: e.id,
        UserId: e.UserId,
        SellerId: e.SellerId,
        ProductId: e.ProductId,
        period: e.period - 1,
        status: e.status
      }
      return newPeriod
    })
    await Transaction.bulkCreate(updatedData, { updateOnDuplicate: ["period"] })
  }
  catch (error) {
    console.log(error);
  }
}, null, true, 'Asia/Jakarta');
// AKHIR CRON

var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', router)
app.use('/', errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})