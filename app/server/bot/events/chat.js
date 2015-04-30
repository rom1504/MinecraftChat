var escapeHtml = require('../../utils').escapeHtml;

module.exports = function(socket) {

  socket.mcbot.on('chat', function(username, message) {
    var text = '<' + username + '> ' + message;
    socket.emit('bot:message', escapeHtml(text));
  });

};
