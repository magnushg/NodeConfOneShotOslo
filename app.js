/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/tsd.d.ts"/>
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var chatMessage = require('./models/chatMessage.js');
var azure = require('azure');
var serviceBusService;


server.listen(port, function () {
  console.log('Server listening at port %d', port);
  mongoose.connect('mongodb://Mongo:52IbFIuHpnZ1To4D2LA4_Wosa4BlbNJ9OHaO4uPssVc-@ds062797.mongolab.com:62797/Mongo'); //process.env.CUSTOMCONNSTR_MONGO_URI
  serviceBusService = azure.createServiceBusService('Endpoint=sb://greenbus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=E4WVvyjW05/zLUJEQBIHNVKyCKlTHyNQhmBeHBTtFDI=');
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom
// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    saveMessage(socket.username, data);
    enqueueMessage(socket.username, data);
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  
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

  
  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
