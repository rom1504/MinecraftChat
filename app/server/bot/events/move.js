export default (socket) => {

  let onmove = () => {
    var pos = socket.mcbot.entity.position;
    if(movingornot(socket.mcbot.entity.velocity)){
      socket.emit('bot:move', {x:pos.x.toFixed(2),y:pos.y.toFixed(2),z:pos.z.toFixed(2)});
    }
  };

  socket.mcbot.on('move', onmove);

  let onforcedMove = () => {
    var pos = socket.mcbot.entity.position;
    socket.emit('bot:forcedMove', {x:pos.x.toFixed(2),y:pos.y.toFixed(2),z:pos.z.toFixed(2)});
  };

  socket.mcbot.on('forcedMove', onforcedMove);

  function movingornot(v){
    if(v.x!=0) return true;
    if(v.y!=0) return true;
    if(v.z!=0) return true;
  }
};
