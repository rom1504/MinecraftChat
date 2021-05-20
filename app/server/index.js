/**
 * chat.alexkvazos.com
 *
 * Minecraft web-based chat client
 * @copyright AlexKvazos 2015
 */

// required modules
import express        from 'express';
import path           from 'path';
import {createServer} from 'http';
import socketio       from 'socket.io';
import redis          from 'socket.io-redis';
import dotenv         from 'dotenv';

// load environment files from .env file
dotenv.config({silent: true});


// create express application, server and socketio instance
let app     = express();
let server  = createServer(app);
let io      = socketio(server);


// setup socket.io-redis if connection variables are set
if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  io.adapter(redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }));
}



// configure socket.io
require('./sockets')(io);


// send homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/templates/index.html'));
});



// public folder serves static content
app.use('/', express.static(path.join(__dirname, '../../public')));


// set port
app.set('port', process.env.PORT || 3000);


// initialize http and socket servers
server.listen(app.get('port'), () => {
  console.log('> Server running on port %s\n', app.get('port'));
});


// handle exceptions
process.on('uncaughtException', (ex) => console.error(ex.stack));
