import mineflayer from 'mineflayer';
import moment     from 'moment';
import events     from '../../bot';

module.exports = (socket) => {

  function onConnection(data) {

    let timestamp = moment().format('MMM D h:mm:ss a');

    // log activity to console
    console.log(`${timestamp}: connecting > ${data.hostname}:${data.port} - ${data.username}`);


    // inform user that connection is being made
    socket.emit('buffer:info', `Connecting to server ${data.hostname}:${data.port}`);


    // if a bot already exists, ask user to disconnect
    if (socket.mcbot) {
      socket.emit('buffer:error', 'Please disconnect before connecting again');
      return;
    }


    // create a mineflayer bot and store it in the client's socket
    socket.mcbot = mineflayer.createBot({
      host:       data.hostname,
      port:       data.port,
      username:   data.username,
      password:   data.password
    });


    // store connection params in socket
    socket.connectionParams = data;


    // bind bot events
    events(socket);

  }

  socket.on('server:connect', onConnection);

};
