module.exports = function(socket) {


  socket.on('disconnect', function() {
    if (socket.mcbot) {
      socket.mcbot.end();
      socket.mcbot = null;
    }
  });


  socket.on('bot:disconnect', function() {
    if (socket.mcbot) {
      socket.mcbot.end();
      socket.mcbot = null;
    }
  });


};