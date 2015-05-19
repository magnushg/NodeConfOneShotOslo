var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

var ChatSchema = new Schema({
  userName      : String, 
  chatMessage   : String,
  itemDate      : { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatModel', ChatSchema);