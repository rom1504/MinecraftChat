module.exports = function(socket) {

  socket.on('chat', function(data) {
    if (socket.mcbot && socket.mcbot.entity) {
      socket.mcbot.chat(data.message);
    }
  });

};
