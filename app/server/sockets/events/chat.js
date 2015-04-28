module.exports = function(socket) {

  socket.on('chat', function(data) {
    if (socket.mcbot) {
      socket.mcbot.chat(data.message);
    }
  });

};