/**
 * Connect Controller
 */

module.exports = function($scope, socket) {

  $scope.chat = '';

  $scope.send = function() {
    if ($scope.chat.trim().length > 0) {

      socket.emit('chat', {
        message: $scope.chat.trim()
      });
      $scope.chat = '';

    }
  }

};
