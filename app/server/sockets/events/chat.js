module.exports = (socket) => {

  socket.on('chat', (data) => {
    if (socket.mcbot && socket.mcbot.entity) {
      socket.mcbot.chat(data.message);
    }
  });

};
