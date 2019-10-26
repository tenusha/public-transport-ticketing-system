const User = require('../model/user');

class RegularUser extends User {
    //Generating regular user object
    constructor(data) {
        super();
        this.username = data.username,
            this.email = data.email,
            this.fname = data.fname,
            this.lname = data.lname,
            this.phone = data.phone,
            this.address = data.address,
            this.password = data.password,
            this.nic = data.nic,
            this.discount = data.discount,
            this.enabled = false,
            this.loginCount = data.loginCount
    }
};

module.exports = RegularUser;