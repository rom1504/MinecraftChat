module.exports = (socket) => {

  function onEnd() {
    socket.emit('bot:disconnect');
    delete socket.mcbot;
  }

  socket.mcbot.on('end', onEnd);

};
