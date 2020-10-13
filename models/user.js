const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
  phone_id: {
    type: String,
    unique: true,
    required: true
  },
  is_button_show: {type:Boolean },
  is_app_show: {type:Boolean },
  contacts: {
    type: Array,
  },
  messagesFerestadani:Array,
  appMostInstall: Array,
  logMessage: Array,
  inputMessage: Array,
  date:{type:Date,default:Date.now()},
  isOnline: Boolean
});
user.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj._id
  delete obj.__v
  return obj
}
module.exports = mongoose.model('user', user);
