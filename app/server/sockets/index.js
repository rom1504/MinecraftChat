module.exports = (io) => {

  io.on('connection', (socket) => {

    // bind all listeners to the socket
    require('./events/connection')(socket);
    require('./events/disconnection')(socket);
    require('./events/chat')(socket);
    require('./events/players')(socket);

  });

};
