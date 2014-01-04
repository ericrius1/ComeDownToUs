(function() {
  var Main;

  window.FW = {};

  FW.width = 3000;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  if (typeof SC !== "undefined" && SC !== null) {
    SC.initialize({
      client_id: "7da24ca214bf72b66ed2494117d05480"
    });
  }

  FW.sfxVolume = 0.2;

  FW.globalTick = 0.16;

  FW.development = false;

  window.onload = function() {
    FW.myDirector = new FW.Director();
    FW.main = new FW.Main();
    FW.myWorld = new FW.World();
    return document.addEventListener('keydown', FW.main.onKeyDown, false);
  };

  FW.Main = Main = (function() {
    function Main() {
      SC.stream("/tracks/come-down-to-us", function(song) {
        var songStartTime;
        FW.song = song;
        songStartTime = Date.now();
        FW.myDirector.beginShow(songStartTime);
        if (!FW.development) {
          return FW.song.play();
        }
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
