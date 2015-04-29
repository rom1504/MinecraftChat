module.exports = function(io) {

  io.on('connection', function(socket) {

    // bind all listeners to the socket
    require('./events/connection')(socket);
    require('./events/disconnection')(socket);
    require('./events/chat')(socket);

  });

};
