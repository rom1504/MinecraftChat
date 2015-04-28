var mineflayer = require('mineflayer');


module.exports = function(io) {

  io.on('connection', function(socket) {

    // bind all events to the socket
    require('./events/connection')(socket);
    require('./events/disconnection')(socket);

  });

};
