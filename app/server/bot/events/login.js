module.exports = (socket) => {

  // login event
  socket.mcbot.on('login', () => {
    socket.emit('buffer:success', 'Successfully logged in as ' + socket.mcbot.username + ' with entity id ' + socket.mcbot.entity.id);
    socket.emit('bot:connect', {
      host: socket.connectionParams.hostname,
      port: socket.connectionParams.port,
      username: socket.mcbot.username
    });
    console.log('logged in > ' + socket.connectionParams.hostname + ':' + socket.connectionParams.port + ' - ' + ' Username: ' + socket.mcbot.username);
  });

};
