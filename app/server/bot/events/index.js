function stringToCode(string) {

  var dictionary = {
    'black': 0,
    'dark_blue': 1,
    'dark_green': 2,
    'dark_aqua': 3,
    'dark_red': 4,
    'dark_purple': 5,
    'gold': 6,
    'gray': 7,
    'dark_gray': 8,
    'indigo': 9,
    'green': 'a',
    'aqua': 'b',
    'red': 'c',
    'light_purple': 'd',
    'yellow': 'e',
    'white': 'f'
  };

  return dictionary[string] || 'f';

}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

module.exports = function(socket) {

  var bot = socket.mcbot;

  // login event
  bot.on('login', function() {
    socket.emit('buffer:success', 'Successfully logged in as ' + bot.username + ' with entity id ' + bot.entity.id);
    socket.emit('bot:connect', {
      host: socket.connectionParams.hostname,
      port: socket.connectionParams.port,
      username: socket.connectionParams.username
    });
  });

  // spawn event
  bot.on('spawn', function() {
    var pos = bot.entity.position;
    socket.emit('buffer:info', 'Spawned at X:' + pos.x + ', Y:' + pos.y + ', Z:' + pos.z);
  });

  // message event
  bot.on('message', function(message) {

    console.log(message);

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
          if (message.with[0].translate === 'commands.whitelist.usage') {
            console.log(message.with[0].json);
          }
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
      return '<span class="color-'+color+'">'+msg.replace(' ', '&nbsp;')+'</span>';
    });

    // send line back to the client
    socket.emit('bot:message', buffer);

  });

  bot.on('end', function() {
    socket.emit('buffer:error', 'Connection lost...');
    socket.emit('bot:disconnect');
  });

  bot.on('kick', function(reason) {
    console.log(reason);
    socket.emit('buffer:error', 'Kicked for: ' + reason);
  });

};