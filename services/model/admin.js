const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nic: {
        type: String
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    enabled : {
        type: Boolean,
        required: true
    }
});

const admin = module.exports = mongoose.model('Admin', adminSchema);