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

// handle root requests
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../views/index.html'));
});

// public folder serves static content
app.use('/static', express.static('public'));


// configure socket.io
require('./sockets')(io);


// initialize http and socket servers
server.listen(3000, function() {
  console.log('> Server running on port 3000')
});
