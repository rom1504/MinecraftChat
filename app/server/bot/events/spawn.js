module.exports = function(socket) {

  // spawn event
  socket.mcbot.on('spawn', function() {
    var pos = socket.mcbot.entity.position;
    socket.emit('buffer:info', 'Spawned at X:' + pos.x + ', Y:' + pos.y + ', Z:' + pos.z);
  });

};
