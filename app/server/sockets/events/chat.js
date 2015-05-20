export default (socket) => {

  let onChat = (data) => {
    if (socket.mcbot && socket.mcbot.entity) {
      socket.mcbot.chat(data.message);
    }
  };

  socket.on('chat', onChat);

};
