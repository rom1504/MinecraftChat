/**
 * chat.alexkvazos.com
 *
 * Minecraft web-based chat client
 * @copyright AlexKvazos 2015
 */

// create new express application
var express = require('express');
var app     = express();
var path    = require('path');
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);




// configure socket.io
require('./sockets')(io);


// send homepage
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/templates/index.html'));
});



// public folder serves static content
app.use('/', express.static(path.join(__dirname, '../../public')));


// set port
app.set('port', process.env.PORT || 3000);


// initialize http and socket servers
server.listen(app.get('port'), function() {
  console.log('\033c> Server running on port %s\n', app.get('port'));
});


// handle exceptions
process.on('uncaughtException', function(ex) {
  console.error(ex.stack);
});
