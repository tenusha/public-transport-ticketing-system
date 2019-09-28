const express = require('express')
const router = express.Router()
const routeModel = require('../model/route')
const trainModel = require('../model/train')
const classModel = require('../model/classes')
const scheduleModel = require('../model/schedule')
const reservationModel = require('../model/reservation')
const client = require('../client')
const configs = require('../config.json')
const qrcode = require('qrcode');

router.get('/railway/routes', async (req, res) => {
    try {
        const result = await routeModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/route/:id', async (req, res) => {
    try {
        const result = await routeModel.findOne({'_id': req.params.id})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/trains', async (req, res) => {
    try {
        const result = await trainModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/trains/:route', async (req, res) => {
    try {
        const route = await routeModel.findOne({'_id': req.params.route})
        const result = await trainModel.find({route: route.name})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/classes', async (req, res) => {
    try {
        const result = await classModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/schedules', async (req, res) => {
    try {
        const result = await scheduleModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/railway/reservations', async (req, res) => {
    try {
        const body = req.body
        var reservation = new reservationModel(body)
        var result = await reservation.save()

        const img = await qrcode.toDataURL(configs.frontendUrl + "/ticket/" + result._id);
        var base64Data = img.replace(/^data:image\/png;base64,/, "");
        await require("fs").writeFile("images/" + result._id + ".png", base64Data, 'base64', function (err) {
            console.log(err);
        });

        const html = '<html><body><h2><u>Reservation Slip</u></h2><p>Reference No : <b> ' + result._id + ' </b><br><br>From <b> ' + body.from + ' </b> to <b> ' + body.to + ' </b><br>' + 'Date :<b> ' + body.date + ' </b> Time :<b> ' + body.time + ' </b><br>Train : <b>' + body.train + ' </b> Class: <b> ' + body.trainClass + ' </b><br>Quantity : <b> ' + body.qty + ' </b></p><p>Total : <b> ' + body.total + ' LKR</b></p><br><img src="cid:123"/></body></html>'

        client.sendReservationEmail({
            ...body,
            html: html,
            subject: 'Railway e-Ticket',
            path: 'images/' + result._id + '.png'
        })

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/reservations', async (req, res) => {
    try {
        const result = await reservationModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/users/:user/reservations', async (req, res) => {
    try {
        const result = await reservationModel.find({user: req.params.user})
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/reservations/trains/:train/class/:trainClass/date/:date/time/:time', async (req, res) => {
    try {
        const train = req.params.train
        const trainClass = req.params.trainClass
        const date = req.params.date
        const time = req.params.time
        const result = await reservationModel.find({train: train, trainClass: trainClass, date: date, time: time})
        var bookings = 0
        result.map(item => bookings += item.qty)
        if (result.length <= 0) {
            res.status(200).json({bookings: 0})
        } else {
            res.status(200).json({bookings})
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/railway/reservations/:id', async (req, res) => {
    try {
        const result = await reservationModel.findOne({_id: req.params.id}).exec()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/railway/reservations/:id', async (req, res) => {
    try {
        const result = await reservationModel.deleteOne({_id: req.params.id}).exec()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/railway/route', async (req, res) => {

    const query = {name: req.body.name}
    routeModel.find(query, (err, route) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (route.length != 0) {
                res.status(200).json({routeExist: true});
            } else {

                let routes = new routeModel(req.body);
                routes.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({routeExist: false});
                    }
                });

            }

        }
    });
});

router.put('/railway/route', async (req, res) => {

    const body = {
        name: req.body.station,
        fair: req.body.fair
    }
    const query = {name: req.body.name}
    await routeModel.find(query, async (err, route) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            var found = null
            found = await route[0].route.find(function (data) {
                return data.name === req.body.station;
            });

            if (found) {
                res.status(200).json({stationExist: true});
            } else {
                routeModel.updateOne(query, {$push: {route: body}}, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({stationExist: false});
                    }
                })
            }

        }
    })

});

router.post('/railway/train', async (req, res) => {

    const query = {name: req.body.name}
    trainModel.find(query, (err, train) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (train.length != 0) {
                res.status(200).json({trainExist: true});
            } else {
                let trains = new trainModel(req.body);
                trains.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({trainExist: false});
                    }
                });

            }

        }
    });
});


router.delete('/railway/train', async (req, res) => {

    const query = {name: req.body.name}
    trainModel.deleteOne(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json({status: true});
        }
    });
});

router.delete('/railway/route', async (req, res) => {

    const query = {name: req.body.name}
    routeModel.deleteOne(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json({status: true});
        }
    });
});

module.exports = router