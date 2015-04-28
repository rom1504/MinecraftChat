module.exports = function(socket) {

  socket.on('disconnect', function() {
    if (socket.mcbot) {
      socket.mcbot.end();
    }
  });

};