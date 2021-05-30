if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || '3000';
// AWAL CRON
const { Transaction } = require('./models')
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

const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(errorHandler)

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })

module.exports=app