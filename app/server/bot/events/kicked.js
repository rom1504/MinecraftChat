import moment from 'moment';

export default (socket) => {

  let onkicked = (reason, loggedIn) => {
  	let timestamp = moment().format('MMM D h:mm:ss a');
    socket.emit('buffer:info',JSON.stringify(reason));
    
    console.log(`${timestamp}: Kicked > ${socket.connectionParams.hostname}:${socket.connectionParams.port} `);
  };

  socket.mcbot.on('kicked', onkicked);

};
