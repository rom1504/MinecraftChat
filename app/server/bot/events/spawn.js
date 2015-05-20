export default (socket) => {

  let onSpawn = () => {
    var pos = socket.mcbot.entity.position;
    socket.emit('buffer:info', `Spawned at X:${pos.x}, Y:${pos.y}, Z:${pos.z}`);
    socket.emit('bot:players', socket.mcbot.players);
  };

  socket.mcbot.on('spawn', onSpawn);

};
