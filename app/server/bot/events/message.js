var stringToCode = require('../../utils').stringToCode;
var escapeHtml   = require('../../utils').escapeHtml;

module.exports = function(socket) {

  // message event
  socket.mcbot.on('message', function(message) {

    // empty buffer
    var buffer = '';

    // modded servers match here
    if (message.extra) {

      // for each piece of text
      message.extra.forEach(function(data) {

        // get the text out of the element
        var text;
        if (typeof data === 'string') {
          text = data;
        } else if (typeof data === 'object') {
          text = data.text;
        }

        // if text is available
        if (text) {
          text = text.replace(/§k/ig, '');    // remove crazy format
          text = text.replace(/§l/ig, '');    // remove bold format
          buffer += '§' + stringToCode(data.color) + text;  // add the text to the buffer
        }

      });

    // vanilla server matches here
    } else if (message.with) {
      var text;

      switch (message.translate) {
        case 'chat.type.announcement':
          text = '§d[' + message.with[0].text + '] ';
          message.with[1].extra.forEach(function(x) {
            text += x;
          });
          break;
        case 'chat.type.admin':
          if (message.with[1].translate === 'commands.op.success') {
            text = '§eOpped ' + message.with[1].with;
          }
          break;
        case 'commands.players.list':
          text = '§eThere are ' + message.with[0] + '/' + message.with[1] + ' players online.';
          break;
        case 'commands.kick.success':
          text = '§e' + message.with[0] + ' kicked!';
          break;
        case 'commands.whitelist.add.success':
          text = '§f' + message.with[0] + ' whitelisted';
          break;
        case 'commands.whitelist.remove.success':
          text = '§f' + message.with[0] + ' removed from whitelist';
          break;
        case 'commands.whitelist.list':
          text = '§f' + message.with[0] + ' players in the whitelist';
          break;
        case 'commands.generic.usage':
          text = '§cInvalid command usage';
          break;
      }

      buffer += text || '[i] [MinecraftChat] Unknown data received from server. [Unsuported Server]';

    } else if (message.text) {
      buffer += message.text;
    } else {
      return;
    }

    if (buffer.length === 0) {
      return;
    }

    // escape any html in the buffer
    buffer = escapeHtml(buffer);

    // format the buffer with the correct coloring
    buffer = buffer.replace(/§([0-9abcdef])([^§]*)/ig, function replace(regex, color, msg) {
      return '<span class="color-'+color+'">'+msg.replace(/ /g, '&nbsp;')+'</span>';
    });

    // send line back to the client
    socket.emit('bot:message', buffer);

  });

};
