const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pishfarz = new Schema({
    counter: {
        type: Number,
    },
});
module.exports = mongoose.model('shomarandeh_pishfarz', pishfarz);
