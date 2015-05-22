var azure = require('azure');
var serviceBusService;

serviceBusService = azure.createServiceBusService('Endpoint=sb://greenbus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=E4WVvyjW05/zLUJEQBIHNVKyCKlTHyNQhmBeHBTtFDI=');

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
  
  enqueueMessage(socket.username, data);