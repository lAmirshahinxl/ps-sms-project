const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const goroho = new Schema({
    counter: {
        type: Number,
    },
});
module.exports = mongoose.model('goroho', goroho);
