var parseVanilla  = require('../../parsers/vanilla');
var parseExtra    = require('../../parsers/extra');


var escapeHtml   = require('../../utils').escapeHtml;

module.exports = (socket) => {

  // message event
  socket.mcbot.on('message', (message) => {

    // empty buffer
    var buffer = '';




    // parse for json objects with 'extra'
    if (message.extra) {
      buffer = parseExtra(message.extra);

    // if the text comes clean
    } else if (message.text) {
      buffer = message.text;

    // if the message is vanilla
    } else if (message.translate)  {
      buffer = parseVanilla(message);

    // the message format is not handled (yet)
    } else {
      return;
    }


    // if none of the parsers returned anything, stop here
    if (!buffer) return;

    // escape any html in the buffer
    buffer = escapeHtml(buffer);

    // format the buffer with the correct coloring
    buffer = buffer.replace(/§([0-9abcdef])([^§]*)/ig, (regex, color, msg) => {
      return '<span class="color-' + color + '">' + msg.replace(/ /g, '&nbsp;') + '</span>';
    });

    // send line back to the client
    socket.emit('bot:message', buffer);

  });

};
