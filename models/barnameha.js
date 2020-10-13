const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apps = new Schema({
    name: {
        type: String, unique: true,
        required: true
    },
    address: {
        type: String, unique: true,
        required: true
    }
});
module.exports = mongoose.model('apps', apps);
