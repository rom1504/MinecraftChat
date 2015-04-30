/**
 * Connect Controller
 */

module.exports = function($scope, socket, servers) {

  $scope.servers = servers.get();

  $scope.select = function(id) {
    $scope.ip   = servers.select(id).ip;
    $scope.port = servers.select(id).port;

    if ($scope.username.length > 0 && $scope.password.length > 0) {
      $scope.connect();
    }

  };

  // connect handler
  $scope.connect = function() {
    $('#connectModal').modal('hide');

    if (socket.connected) {

      socket.emit('server:connect', {
        username: $scope.username,
        password: $scope.password,
        hostname: $scope.ip,
        port: $scope.port || 25565
      });

    } else {
      alert('Server unreachable, please try again later...');
    }
  };

};
