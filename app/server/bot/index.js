import error   from './events/error';
import login   from './events/login';
import spawn   from './events/spawn';
import message from './events/message';
import end     from './events/end';

// bind all listeners to the bot
module.exports = (socket) => {

  error(socket);
  login(socket);
  spawn(socket);
  message(socket);
  end(socket);

};
