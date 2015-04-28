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

  return dictionary[string] || string;

}

module.exports = function(socket) {

  var bot = socket.mcbot;

  // login event
  bot.on('login', function() {
    socket.emit('buffer:success', 'Successfully logged in as ' + bot.username + ' with entity id ' + bot.entity.id);
    socket.emit('bot:login')
  });

  // spawn event
  bot.on('spawn', function() {
    var pos = bot.entity.position;
    socket.emit('buffer:info', 'Spawned at X:' + pos.x + ', Y:' + pos.y + ', Z:' + pos.z);
  });

  // message event
  bot.on('message', function(message) {

    // empty buffer
    var buffer = '';

    if (message.extra) {

      // for each piece of text
      message.extra.forEach(function(data) {
        var text = data.text;                 // get the text
        if (text) {                           // if text is available
          text = text.replace(/§k/ig, '');    // remove crazy format
          text = text.replace(/§l/ig, '');    // remove bold format
          buffer += '§' + stringToCode(data.color) + text;  // add the text to the buffer
        }
      });

    } else if (message.text) {
      buffer += message.text;
    } else {
      return;
    }

    if (buffer.length === 0) {
      return;
    }

    // format the buffer with the correct coloring
    buffer = buffer.replace(/§([0-9abcdef])([^§]*)/ig, function replace(regex, color, msg) {
      return '<span class="color-'+color+'">'+msg+'</span>';
    });

    // send line back to the client
    socket.emit('bot:message', buffer);

  });

};