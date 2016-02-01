export default (socket) => {

  let ondeath = () => {
    var pos = socket.mcbot.entity.position;
    socket.emit('buffer:info', `You have been dead in X:${pos.x}, Y:${pos.y}, Z:${pos.z} `);
  };

  socket.mcbot.on('death', ondeath);

};
