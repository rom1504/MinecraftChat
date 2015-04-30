module.exports = (socket) => {


  socket.on('disconnect', () => {
    if (socket.mcbot) {
      socket.mcbot.end();
      delete socket.mcbot;
    }
  });


  socket.on('bot:disconnect', () => {
    if (socket.mcbot) {
      socket.mcbot.end();
      delete socket.mcbot;
    }
  });


};
