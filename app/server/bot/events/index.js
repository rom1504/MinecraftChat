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
          buffer += text;                     // add the text to the buffer
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
    console.log(buffer);

  });

};