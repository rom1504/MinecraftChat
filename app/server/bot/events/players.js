module.exports = function(socket) {

  var interval;

  // send the player list as soon as the bot spawns
  socket.mcbot.on('spawn', function() {
    socket.emit('bot:players', socket.mcbot.players);

    // update the client with the player list every 5 seconds
    interval = setInterval(function() {
      if (socket.mcbot && socket.mcbot.entity) {
        socket.emit('bot:players', socket.mcbot.players);
      } else {
        console.error('leaked interval!');
      }
    }, 5000);

  });

  socket.mcbot.on('end', function() {
    if (interval) {
      clearInterval(interval);
    }
  });

  socket.on('disconnect', function() {
    if (interval) {
      clearInterval(interval);
    }
  });

};
