/**
 * Connect Controller
 */

module.exports = function($scope, socket) {

  $scope.chat = '';

  socket.on('bot:spawn', function() {
    socket.emit('chat', { message: 'Connected via MinecraftChat - https://chat.alexkvazos.com' });
  });

  $scope.send = function() {
    if ($scope.chat.trim().length > 0) {

      socket.emit('chat', {
        message: $scope.chat.trim()
      });
      $scope.chat = '';

    }
  };

};
