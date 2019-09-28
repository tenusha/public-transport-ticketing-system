const express = require('express')
const router = express.Router()
const AdminModel = require('../model/admin')
const client = require('../client')

router.post('/admin/login', (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    try {
        AdminModel.findOne({ email: username, password: password }, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                if (val) {
                    res.status(200).json(val)
                } else {
                    res.status(401).json("unauthorized")
                }
            }
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/admin/:id', async (req, res) => {
    const body = req.body
    try {
        var admin = await AdminModel.findById(req.params.id).exec()
        admin.set({ ...body})
        var result = await admin.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/admin/register', async (req, res) => {
    const body = req.body
    const email = body.email

    var exist = ""
    try {
        await AdminModel.findOne({ email: email }, (err, val) => {
            if (err) {
                console.log(err);
            } else {
                exist = val
            }
        });

        if (exist) {
            res.status(409).json({ exist: true })
        } else {
            var admin = new AdminModel({ ...body, enabled: false});
            //sending email
            const html = '<p>Hi ' + admin.fname + ',<br><br> You have been registered as an admin in the public transport ticketing system.<br><br>To activate your account, please click the following link and sign in now.<br>' + configs.backendUrl + '/admin/reg/' + Buffer.from(body.email).toString('base64') + '</p><br>Please use your <b>NIC Number</b> to login'
            client.sendEmail({ ...body, html, subject: 'Confirm Your Email' })

            var result = await admin.save()
            res.status(200).json(result)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/admin/reg/:email', async (req, res) => {
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
            'Location': configs.frontendAdminUrl
        });
        res.end();

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/admin/admins', async (req, res) => {
    try {
        const result = await AdminModel.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/admin/:id', async (req, res) => {
    try {
        const result = await AdminModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;