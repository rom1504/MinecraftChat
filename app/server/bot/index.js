// bind all listeners to the bot
  var login   = require('./events/login');
  var spawn   = require('./events/spawn');
  var message = require('./events/message');
  var end     = require('./events/end');

module.exports = (socket) => {

  login(socket);
  spawn(socket);
  message(socket);
  end(socket);

};
