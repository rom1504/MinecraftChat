module.exports = function(socket) {

  socket.mcbot.on('end', function() {
    socket.emit('bot:disconnect');
    delete socket.mcbot;
  });

};
