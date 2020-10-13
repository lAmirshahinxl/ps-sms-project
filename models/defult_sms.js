const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defultSms = new Schema({
    sms: {
        type: String, unique: false,
    },
    notif: {
        type: String, unique: false,
    }
});
module.exports = mongoose.model('defultSms', defultSms);
