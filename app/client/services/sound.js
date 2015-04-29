module.exports = function() {

  var connected = "connected";
  var error     = "error";

  createjs.Sound.registerSound("/sounds/connected.mp3", connected);
  createjs.Sound.registerSound("/sounds/error.mp3", error);

  return {
    connected: function() {
      createjs.Sound.play(connected);
    },
    error: function() {
      createjs.Sound.play(error);
    }
  };

};
