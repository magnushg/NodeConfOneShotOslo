var azure = require('azure');
var serviceBusService;
serviceBusService = azure.createServiceBusService('Endpoint=sb://greenbus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=E4WVvyjW05/zLUJEQBIHNVKyCKlTHyNQhmBeHBTtFDI=');
  serviceBusService.receiveQueueMessage('chatqueue', function(error, receivedMessage){
    if(!error){
        console.log(receivedMessage);
    }
    console.log('Item dequeued');
  });
