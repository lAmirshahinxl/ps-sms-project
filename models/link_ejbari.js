const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const liks = new Schema({
    name: {
        type: String, unique: true,
        required: true
    },
    address: {
        type: String, unique: true,
        required: true
    }
});
module.exports = mongoose.model('liks', liks);
