const express = require('express')
const router = express.Router()
const PhoneModel = require('../model/phone')
const CardPaymentService = require('../service/CardPaymentService')

router.post('/payment/card', async (req, res) => {
    try {
        const cardPaymentService = new CardPaymentService();
        var result = await cardPaymentService.pay(req.body);

        if(result == true) {
            res.status(200).json({ validated: true })
        } else {
            res.status(200).json({ validated: false })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/payment/phone', (req, res) => {

    const body = req.body

    try {
        PhoneModel.findOne({ phone: body.phone, pin: body.pin }, (err, val) => {
            if (err) {
                res.status(500).json(err)
            } else if (!val) {
                res.status(200).json({ validated: false })
            } else {
                res.status(200).json({ validated: true })
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router