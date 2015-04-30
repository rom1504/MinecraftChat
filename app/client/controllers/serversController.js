module.exports = function($scope, servers) {

  function resetForm() {
    $scope.name = '';
    $scope.ip = '';
    $scope.port = '';
  }

  $scope.servers = servers.get();

  $scope.add = function() {
    var server = {
      name: $scope.name,
      ip:   $scope.ip,
      port: $scope.port || 25565
    };
    servers.add(server);
    $scope.servers = servers.get();
    resetForm();
  };


  $scope.delete = function(index) {
    servers.delete(index);
    $scope.servers = servers.get();
  };

};
