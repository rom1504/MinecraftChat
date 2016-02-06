export default (socket) => {

  let onHealth = () => {
  	var health = socket.mcbot.health || 0;
  	var food = socket.mcbot.food||0;
  	var foodSaturation = socket.mcbot.foodSaturation||0;
    socket.emit('bot:health', {health:health,food:food,foodSaturation:foodSaturation});
  };

  socket.mcbot.on('health', onHealth);

};
