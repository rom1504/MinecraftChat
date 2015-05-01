module.exports = (socket) => {

  socket.mcbot.on('error', (error) => {

    // this is okay because the connection was ended
    if (error.toString() === 'Error: write after end') return;

    // log the error in the client's buffer
    socket.emit('buffer:error', error);

    // if the bot is logged in and/or is an entity, destroy it
    if (socket.mcbot.entity) socket.mcbot.end();

    // delete the bot
    delete socket.mcbot;

  });

};
