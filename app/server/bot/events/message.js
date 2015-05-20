import parseVanilla  from '../../parsers/vanilla';
import parseExtra    from '../../parsers/extra';
import {escapeHtml}  from '../../utils';


export default (socket) => {

  let onMessage = (message) => {

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

    // format the buffer with the correct coloring and format whitespace
    buffer = buffer.replace(/§([0-9abcdef])([^§]*)/ig, (regex, color, msg) => {
      msg = msg.replace(/ /g, '&nbsp;');
      return `<span class="color-${color}">${msg}</span>`;
    });

    buffer = buffer.replace(/((([A-Za-z]{3,9}:(?:\/\/))(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.))((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\-\.\!\/\\\w]*))?)/gi, (regex) => {
      return `<a href="${regex}" target="_blank">${regex}</a>`;
    });

    // send line back to the client
    socket.emit('bot:message', buffer);

  };

  socket.mcbot.on('message', onMessage);

};
