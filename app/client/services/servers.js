module.exports = function() {

  // initialize servers store if doesn't exist
  localStorage.servers = localStorage.servers || '[]';


  // load servers from localstorage
  var servers = JSON.parse(localStorage.servers);


  // function to save servers into localStorage
  function save() {
    localStorage.servers = JSON.stringify(servers);
  }


  return {
    get: function() {
      return servers;
    },
    select: function(id) {
      return servers[id];
    },
    add: function(server) {
      servers.push(server);
      save();
    },
    delete: function(index) {
      servers.splice(index, 1);
      save();
    }
  };

};
