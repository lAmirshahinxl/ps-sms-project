const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hidden = new Schema({
    state: {
        type: Boolean,default:true
    },
});
module.exports = mongoose.model('hidden_button', hidden);
