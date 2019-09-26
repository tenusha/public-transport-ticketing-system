const express = require('express')
const router = express.Router()
const UserModel = require('../model/user')
const client = require('../client')
const configs = require('../config.json')

router.post('/register', async (req, res) => {
    const body = req.body
    const email = body.email

    var exist = ""
    try {
        await UserModel.findOne({ email: email }, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                exist = val
            }
        });

        if (exist) {
            res.status(409).json({ exist: true })
        } else {
            const discount = false
            if (body.nic) {
                discount = await client.validateNIC(body.nic)
            }
            var code = Math.floor(Math.random() * 90000) + 10000;
            var user = new UserModel({ ...body, discount: discount, enabled: false, code });

            //sending email
            const html = '<p>Hi ' + user.fname + ',<br><br> Thank you for registering with public transport ticketing system.<br><br>To activate your account, please click the following link and sign in now.<br>' + configs.backendUrl + '/users/reg/' + Buffer.from(body.email).toString('base64') + '</p> '
            client.sendEmail({ ...body, html, subject: 'Confirm Your Email' })


            var result = await user.save()
            res.status(200).json(result)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/users/reg/:email', async (req, res) => {
    try {
        const encodedEmail = req.params.email;
        const email = Buffer.from(encodedEmail, 'base64').toString('ascii');

        //get user from db
        var user = await UserModel.findOne({ email }).exec();
        user.set({ enabled: true })

        //saving user in db
        user.save()

        //redirecting user to homepage
        res.writeHead(302, {
            'Location': configs.frontendUrl
        });
        res.end();

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router