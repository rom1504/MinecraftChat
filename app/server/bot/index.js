// bind all listeners to the bot
  import login   from './events/login';
  import spawn   from './events/spawn';
  import message from './events/message';
  import end     from './events/end';

module.exports = (socket) => {

  login(socket);
  spawn(socket);
  message(socket);
  end(socket);

};
