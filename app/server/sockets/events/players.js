module.exports = function(socket) {

  socket.on('players', function() {
    if (socket.mcbot && socket.mcbot.players) {
      socket.emit('bot:players', socket.mcbot.players);
    }
  });

};
