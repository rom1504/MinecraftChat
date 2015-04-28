/**
 * Connect Controller
 */

module.exports = function($scope, socket) {

  // connect handler
  $scope.connect = function() {
    $('#connectModal').modal('hide')

    if (socket.connected) {

      socket.emit('server:connect', {
        username: $scope.username,
        password: $scope.password,
        hostname: $scope.ip,
        port: $scope.port || 25565
      }, function(response) {

      });

    } else {
      alert('Server unreachable, please try again later...');
    }
  }

};
