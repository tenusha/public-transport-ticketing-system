const express = require('express')
const router = express.Router()
const CardModel = require('../model/card')
const PhoneModel = require('../model/phone')

router.post('/payment/card', (req, res) => {

    const body = req.body

    try {
        CardModel.findOne({ card: body.card, cvc: body.cvc, exp: body.exp }, (err, val) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else if (!val) {
                res.status(200).json({ validated: false })
            } else {
            	if(val.amount >= req.body.total) {
            		console.log(req.body.total + " paid")
            		var cm = new CardModel()
            		const newAmt = val.amount - req.body.total
            		cm = {...val, amount: newAmt } 
            		cm.save()
            		res.status(200).json({ validated: true })
            	} else {
            		res.status(200).json({ validated: false })
            	}
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/payment/phone', (req, res) => {

    const body = req.body

    try {
        PhoneModel.findOne({ phone: body.phone, pin: body.pin }, (err, val) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else if (!val) {
                res.status(200).json({ validated: false })
            } else {
                console.log(req.body.total + " paid")
                res.status(200).json({ validated: true })
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router