module.exports = (socket) => {

  socket.on('players', () => {
    if (socket.mcbot && socket.mcbot.players) {
      socket.emit('bot:players', socket.mcbot.players);
    }
  });

};
