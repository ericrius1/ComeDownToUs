(function() {
  var Main;

  window.FW = {};

  FW.width = 3000;

  FW.height = 12000;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  if (typeof SC !== "undefined" && SC !== null) {
    SC.initialize({
      client_id: "7265905d50a4ae541fd4219bc9b2b0db"
    });
  }

  FW.globalTick = 0.16;

  window.onload = function() {
    FW.myDirector = new FW.Director();
    FW.main = new FW.Main();
    FW.myWorld = new FW.World();
    return document.addEventListener('keydown', FW.main.onKeyDown, false);
  };

  FW.Main = Main = (function() {
    function Main() {
      SC.stream("/tracks/burial-come-down-to-us", function(song) {
        var songStartTime;
        FW.song = song;
        songStartTime = Date.now();
        FW.song.play();
        return FW.myDirector.beginShow(songStartTime);
      });
    }

    Main.prototype.onKeyDown = function(event) {
      if (event.keyCode === 32) {
        return FW.myDirector.freeze();
      }
    };

    return Main;

  })();

}).call(this);
