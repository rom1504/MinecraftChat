/**
 * Connect Controller
 */

module.exports = function($scope, socket) {

  $scope.connected = false;

  socket.on('bot:connect', function(data) {
    $scope.$apply(function() {
      $scope.host      = data.host;
      $scope.port      = data.port;
      $scope.username  = data.username;
      $scope.connected = true;
    });
  });

  socket.on('bot:disconnect', function() {
    $scope.$apply(function() {
      $scope.connected = false;
    });
  });

  socket.on('disconnect', function() {
    $scope.$apply(function() {
      $scope.connected = false;
    });
  });

  $scope.disconnect = function() {
    socket.emit('bot:disconnect', true);
  };

};
