var mongoose = require('mongoose');
var chatMessage = require('./models/chatMessage.js');

var azure = require('azure');
var serviceBusService;

mongoose.connect('mongodb://Mongo:52IbFIuHpnZ1To4D2LA4_Wosa4BlbNJ9OHaO4uPssVc-@ds062797.mongolab.com:62797/Mongo'); //process.env.CUSTOMCONNSTR_MONGO_URI
serviceBusService = azure.createServiceBusService('Endpoint=sb://greenbus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=E4WVvyjW05/zLUJEQBIHNVKyCKlTHyNQhmBeHBTtFDI=');

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
  
  function enqueueMessage(username, message) {
    var messageToEnqueue = {
    body: username + ': ' + message
    };
    serviceBusService.sendQueueMessage('chatqueue', messageToEnqueue, function(error){
      if(!error){
          console.log('Message enqueued');
      }
     });
  }
  
 saveMessage(socket.username, data);
 enqueueMessage(socket.username, data);

