require('dotenv').config()

// AWAL CRON
const { Transaction } = require('./models')
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', async () => {
  try {
    let minus = await Transaction.findAll({ where: { status: true } })
    let updatedData = minus.map(e => {
      let newPeriod = {
        id: e.id,
        UserId: e.UserId,
        SellerId: e.SellerId,
        ProductId: e.ProductId,
        period: (e.period) ? e.period - 1 : e.period,
        confirmationPeriod: (e.confirmationPeriod) ? e.confirmationPeriod - 1 : e.confirmationPeriod,
        status: e.status,
        msgForUser: (e.period - 1 === 0) ? "please return the item you borrowed" : e.msgForUser,
        msgForSeller: (e.confirmationPeriod - 1 === 0) ? "please confirm that you already received the item" : e.msgForSeller,
      }
      return newPeriod
    })
    await Transaction.bulkCreate(updatedData, { updateOnDuplicate: ["period", "confirmationPeriod", "msgForUser", "msgForSeller"] })
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