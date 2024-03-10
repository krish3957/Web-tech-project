const crypto =  require('crypto');
var CryptoJS = require("crypto-js");
const axios = require('axios');
const { verifyToken } = require('./verifyToken');
const router = require('express').Router();
const salt_key = process.env.SALT_KEY

router.post('/newPay',verifyToken,async (req, res) => {
    try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: process.env.MID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: crypto.AES.decrypt(req.body.amount, 'ABCDEFGH').toString(Crypto.enc.Utf8) * 100,
            redirectUrl: `http://localhost:3000/success`,
            redirectMode: 'REDIRECT',
            callbackUrl: `http://localhost:5000/api/phonepe/status/${merchantTransactionId}`,
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        res.send({ payload:payloadMain, checksum:checksum });
    } catch (error) {

    }
});

router.post('/newPayment', async (req, res) => {

    try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: process.env.MID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            amount: CryptoJS.AES.decrypt(req.body.amount, 'ABCDEFGH').toString(CryptoJS.enc.Utf8) * 100,
            redirectUrl: `http://localhost:3000/success`,
            redirectMode: 'REDIRECT',
            callbackUrl: `http://localhost:5000/api/phonepe/status/${merchantTransactionId}`,
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
    


        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };
        console.log(checksum);
        console.log(payloadMain);

        axios.request(options).then(function (response) {
            console.log(response.data);
            console.log(response.data.data.instrumentResponse);
            res.send(response.data.data.instrumentResponse);
        })
        .catch(function (error) {
            res.status(500).send({erorr:true,message: error});
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
            success: false
        })
    }
})

router.post('/status/:merchantTransactionId', async (req, res) => {
    console.log('1');
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async(response) => {
        if (response.data.success === true) {
            const url = `http://sev7n.in/success`;
            res.send(url, { state: { address: req.body.address, orderId: merchantTransactionId } })
            // res.send(url, { state: { address: req.body.address, orderId: merchantTransactionId } })
        } else {
            const url = `https://sev7n.in/success`
            return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
});

module.exports = router;
