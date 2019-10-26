const RegularUser = require('../domain/RegularUser');
const GoogleUser = require('../domain/GoogleUser');

module.exports = {
    createUser(data) {
        if (data.type == 'regular') return new RegularUser(data);
        if (data.type == 'google') return new GoogleUser(data);
    }
}