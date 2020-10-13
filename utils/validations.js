const validatePhoneNumber = require('validate-phone-number-node-js');
const bcrypt = require('bcrypt');
exports.validation = {
    isNumber: function (val) {
        return !(typeof val == 'undefined')
    },
    isEmpty: function (val) {
        return !(typeof val == 'undefined')
    },
    isPhoneNumber: function (val) {
        return validatePhoneNumber.validate(val)
    },
    isNotUndefined: function (val) {
        return (typeof val != 'undefined')
    },
    isPassword(password) {
        return bcrypt.compareSync(password, process.env.PASSWORD_ADMIN)
    }
} 