Node conf One Shot Oslo
=======================
* I will show how you can use node in combination with Azure to deliver value for customers

Intro
-----
* Bouvet
* Johnny-five / Arduino / Raspberry
* Statkraft / Web API -> TypeScript -> Knockout -> Gulp -> Bower -> Karma

The story of Nodejs and Azure
* Supported since 2011
* Nodejs libraries for Azure services like table store, service bus etc
* Deploy nodejs applications to Web / API sites
* Visual studio node tools is awesome
* Visual studio code
-----------------------------
Create a chat site with a Nodejs back-end, deploy to Azure
----------------------------------------------------------
* might as well be doing this on a mac
* `npm install azure-cli -g`, Microsoft Azure Cross Platform Command Line tool
* `azure account download`
* `azure account import publishsettings.publishsettings`* 
* `git init`
* `azure site create awesome-chat --git`, username magnusg
* `git add --all`
* `git commit -am "Initial commit"`
* `git push azure master`
* `azure site set -w`
* Browse to site with `azure site browse`
* Show portal http://portal.azure.com
* Logging in console window, `azure site log tail awesome-chat`

Hooking in MongoDb hosted in Azure
----------------------------------
* Get MongoLab uri from "connection info"
* Paste connection uri into web site connection strings, run `azure site connectionstring add mongo_uri mongodb://Mongo:52IbFIuHpnZ1To4D2LA4_Wosa4BlbNJ9OHaO4uPssVc-@ds062797.mongolab.com:62797/Mongo Custom`
* Move forward in git repo, add mongo view model and mongo saving code.
* npm install azure 
* Connect to Azure Service Bus Queue
* 

Why use Azure for nodejs apps? How is it different from the competition
-----------------------------------------------------------------------
* Heroku
* Modulus
* Google Cloud Plattform
* TODO: Pricing

Visual Studio Code IntelliSense / Debug Demo
--------------------------------------------
* Install typings using `npm install tsd -g`
* Install specific type with `tsd install express --save`
* Show debugging of code from earlier, command runner etc.

Wrap up
-------
* I'm happy using it
* Microsoft seems to be going in right direction with this, support existing, not invent new stuff