module.exports = function(socket) {


  socket.on('disconnect', function() {
    if (socket.mcbot) {
      socket.mcbot.end();
      delete socket.mcbot;
    }
  });


  socket.on('bot:disconnect', function() {
    if (socket.mcbot) {
      socket.mcbot.end();
      delete socket.mcbot;
    }
  });


};
