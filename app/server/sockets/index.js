var mineflayer = require('mineflayer');


module.exports = function(io) {

  io.on('connection', function(socket) {

    socket.on('server:connect', function(data, response) {
      socket.mcbot = mineflayer.createBot({
        host: data.hostname,
        port: data.port,
        username: data.username,
        password: data.password
      });
      socket.mcbot.on('error', function(error) {
        console.log(error);
        socket.emit('bot:error', error);
      });
    });

    socket.on('disconnect', function() {
      socket.mcbot = null;
    });

  });

};
