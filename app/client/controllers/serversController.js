module.exports = function($scope, servers) {

  function resetForm() {
    $scope.name = '';
    $scope.ip = '';
    $scope.port = '';
    $scope.version = "1.16.5";
  }

  $scope.servers = servers.get();

  $scope.add = function() {
    var server = {
      name: $scope.name,
      ip:   $scope.ip,
      port: $scope.port || 25565,
      version: $scope.version || "1.16.5",
    };
    servers.add(server);
    $scope.servers = servers.get();
    resetForm();
  };


  $scope.delete = function(index) {
    servers.delete(index);
    $scope.servers = servers.get();
  };

  $scope.selectversion = function(version){
    $scope.version=version;
  }

};
