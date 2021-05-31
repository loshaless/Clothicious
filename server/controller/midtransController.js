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
            next(err)
        }
    }
}

module.exports = MidtransController