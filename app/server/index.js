/**
 * chat.alexkvazos.com
 *
 * Minecraft web-based chat client
 * @copyright AlexKvazos 2015
 */

// load environment files from .env file
require('dotenv').load();

// create new express application
var express = require('express');
var app     = express();
var path    = require('path');
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);
var redis   = require('socket.io-redis');


// setup socket.io-redis if connection variables are set
if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  io.adapter(redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }));
}



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
  console.log('> Server running on port %s\n', app.get('port'));
});


// handle exceptions
process.on('uncaughtException', function(ex) {
  console.error(ex.stack);
});
