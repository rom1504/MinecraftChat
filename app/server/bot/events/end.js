module.exports = (socket) => {

  socket.mcbot.on('end', () => {
    socket.emit('bot:disconnect');
    delete socket.mcbot;
  });

};
