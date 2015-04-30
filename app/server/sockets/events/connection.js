var mineflayer = require('mineflayer');
var events     = require('../../bot');

module.exports = (socket) => {

  socket.on('server:connect', (data) => {

    if (socket.mcbot) {
      socket.emit('buffer:error', 'Pleae disconnect before connecting again');
      return;
    }

    // create mineflayer bot
    socket.mcbot = mineflayer.createBot({
      host: data.hostname,
      port: data.port,
      username: data.username,
      password: data.password
    });

    // store connection params in socket
    socket.connectionParams = data;

    // prepare for errors
    socket.mcbot.on('error', (error) => {
      if (error.toString() === 'Error: write after end') return;
      socket.emit('buffer:error', error);
      if (socket.mcbot.entity) socket.mcbot.end();
      delete socket.mcbot;
    });

    // bind bot events
    events(socket);

    // debug
    console.log('connecting > ' + data.hostname + ':' + data.port + ' - ' + ' Username: ' + data.username);
    socket.emit('buffer:info', 'Connecting to server ' + data.hostname + ':' + data.port);

  });

};
