process.env.DEBUG = 'bot';
process.stdout.write('\033c');
console.log('> MineFlayer Initializing');

var mineflayer = require('mineflayer');
var log = require('debug')('bot');

var bot = mineflayer.createBot({
  host: 'play.koonkraft.net',
  port: 25565,
  username: 'alexth',
  password: 'alexth123'
});

bot.on('login', function() {
  bot.chat('/prison');
});

bot.on('message', function(message) {
  var buffer = '';
  message.extra.forEach(function(data) {
    var text = data.text;
    if (text) {
      text = text.replace(/§k/ig, '');
      text = text.replace(/§l/ig, '');
      buffer += text;
    }
  });
  buffer = buffer.replace(/§([0-9abcdef])([^§]*)/ig, function replace(x, y, z) {
    return '<span class="color-'+y+'">'+z+'</span>';
  });
  process.stdout.write(buffer + '<br>\n');
});
