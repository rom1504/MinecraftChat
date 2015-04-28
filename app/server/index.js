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




// initialize http and socket servers
server.listen(3000, function() {
  console.log('\033c> Server running on port 3000\n');
});


// handle exceptions
process.on('uncaughtException', function(ex) {
  console.error(ex);
});