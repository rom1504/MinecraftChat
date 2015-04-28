var mineflayer = require('mineflayer');

module.exports = function(socket) {

  socket.on('server:connect', function(data, response) {

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
    socket.mcbot.on('error', function(error) {
      socket.emit('buffer:error', error);
      socket.mcbot = null;
    });

    // bind bot events
    require('../../bot')(socket);

    // debug
    console.log('login > ' + data.hostname + ':' + data.port + ' - ' + ' Username: ' + data.username);
    socket.emit('buffer:info', 'Connecting to server ' + data.hostname + ':' + data.port);

  });

};
