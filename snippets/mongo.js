var mongoose = require('mongoose');
var chatMessage = require('./models/chatMessage.js');

mongoose.connect('mongodb://Mongo:52IbFIuHpnZ1To4D2LA4_Wosa4BlbNJ9OHaO4uPssVc-@ds062797.mongolab.com:62797/Mongo'); //process.env.CUSTOMCONNSTR_MONGO_URI

 function saveMessage(username, message) {
    var newChatMessage = new chatMessage();
    newChatMessage.userName = username;
    newChatMessage.chatMessage = message;
    newChatMessage.save(function savedTask(err) {
      if(err) {
        throw err;
      }
      console.log('Chat message from ' + newChatMessage.userName + ' saved');
    });
  }
  
  saveMessage(socket.username, data);

