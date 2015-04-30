module.exports = (socket) => {

  // spawn event
  socket.mcbot.on('spawn', () => {
    var pos = socket.mcbot.entity.position;
    socket.emit('buffer:info', 'Spawned at X:' + pos.x + ', Y:' + pos.y + ', Z:' + pos.z);
    socket.emit('bot:players', socket.mcbot.players);
    socket.emit('bot:spawn');
  });

};
