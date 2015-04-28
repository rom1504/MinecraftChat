/**
 * Connect Controller
 */

module.exports = function($scope, socket) {

  $scope.chat = '';

  if (window.location.hostname === 'chat.alexkvazos.com') {
  socket.emit('chat', { message: 'Connected via web chat client / chat.alexkvazos.me.' });
  }

  $scope.send = function() {
    if ($scope.chat.trim().length > 0) {

      socket.emit('chat', {
        message: $scope.chat.trim()
      });
      $scope.chat = '';

    }
  }

};
