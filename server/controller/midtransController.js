const midtransClient = require('midtrans-client')

class MidtransController {
    static async runDummy(req, res, next) {
        try {
            console.log('masuk request ke midtrans')

            const parameter = req.body.parameter

            let snap = new midtransClient.Snap({
                isProduction: false,

                serverKey: 'SB-Mid-server-Ysjn59XIeB0S44WHW11hlJss',
                clientKey: 'SB-Mid-client-k2i2_7x1rc9HF1Q3'
                // serverKey : 'SB-Mid-server-6QOWTrQcZ35EVYcgpd7Py87j',
                // clientKey : 'SB-Mid-client-K_mMxE9pgZqhh4L4'
            });

            snap.createTransaction(parameter)
                .then(transaction => {
                    // transaction token
                    let transactionToken = transaction.token;
                    console.log('transactionToken:', transactionToken);
                    res.status(200).json(transactionToken)
                })
                .catch(error => console.log(error))
        } catch (err) {
            console.log(err, 'dari server controller midtrans')
            next(err)
        }
    }

    static async handlingAfterPayment(req, res, next) {
        try {
            console.log('masuk controlerrrrrrrrr', req.body)
            let apiClient = new midtransClient.Snap({
                    isProduction : false,
                    serverKey : 'SB-Mid-server-Ysjn59XIeB0S44WHW11hlJss',
                    clientKey : 'SB-Mid-client-k2i2_7x1rc9HF1Q3'
                });
             
            apiClient.transaction.notification(req.body)
                .then((statusResponse)=>{
                    let orderId = statusResponse.order_id;
                    let transactionStatus = statusResponse.transaction_status;
                    let fraudStatus = statusResponse.fraud_status;
             
                    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
             
                    // Sample transactionStatus handling logic
             
                    if (transactionStatus == 'capture'){
                        if (fraudStatus == 'challenge'){
                            // TODO set transaction status on your database to 'challenge'
                            // and response with 200 OK
                            console.log('ini masuk ke challenge')
                            res.status(200).json({'OK': 'OK'})
                        } else if (fraudStatus == 'accept'){
                            // TODO set transaction status on your database to 'success'
                            // and response with 200 OK
                            console.log('ini masuk ke accept')
                            res.status(200).json({'OK': 'OK'})

                        }
                    } else if (transactionStatus == 'settlement'){
                        // TODO set transaction status on your database to 'success'
                        // and response with 200 OK
                        console.log('ini masuk ke settlement')
                        res.status(200).json({'OK': 'OK'})

                    } else if (transactionStatus == 'cancel' ||
                      transactionStatus == 'deny' ||
                      transactionStatus == 'expire'){
                      // TODO set transaction status on your database to 'failure'
                      // and response with 200 OK
                      console.log('ini masuk cancel deny expire')
                      res.status(200).json({'OK': 'OK'})


                    } else if (transactionStatus == 'pending'){
                      // TODO set transaction status on your database to 'pending' / waiting payment
                      // and response with 200 OK
                      console.log('ini masuk ke pending')
                      res.status(200).json({'OK': 'OK'})

                    }
                });
        } catch (err) {
            console.log(err, 'dari midtrans afterpayments')
            next(err)
        }
    }
}

module.exports = MidtransController