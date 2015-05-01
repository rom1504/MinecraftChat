module.exports = (socket) => {

  function onChat(data) {
    if (socket.mcbot && socket.mcbot.entity) {
      socket.mcbot.chat(data.message);
    }
  }

  socket.on('chat', onChat);

};
