module.exports = function(socket) {

  // bind all listeners to the bot
  require('./events/login')(socket);
  require('./events/spawn')(socket);
  require('./events/message')(socket);
  // require('./events/chat')(socket);
  require('./events/end')(socket);

};
