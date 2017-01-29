import error   from './events/error';
import login   from './events/login';
import spawn   from './events/spawn';
import message from './events/message';
import end     from './events/end';
import death   from './events/death';
import rain    from './events/rain';
import health  from './events/health';
import move    from './events/move';
import kicked    from './events/kicked';

// bind all listeners to the bot
export default (socket) => {

  error(socket);
  login(socket);
  spawn(socket);
  message(socket);
  end(socket);
  death(socket);
  rain(socket);
  move(socket);
  health(socket);
  kicked(socket);
  
};
