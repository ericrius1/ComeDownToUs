
PV.Audio = new function() {

  this.init = function(trackURL) {

    // var audio = new Audio();
    // audio.src = trackURL;
    //audio.autoplay = true;


    var context;
    var source;
    var analyser;
    var buffer;
    this.soundArray = new Array();
    this.boost = 0;
    this.sourceJs;

    try {
      if (typeof webkitAudioContext === 'function') {
        context = new webkitAudioContext();
      } else {
        context = new AudioContext();
      }
    } catch (e) {
      $('#info').text('Web Audio API is not supported in this browser');
    }


    var request = new XMLHttpRequest();
    request.open('GET', trackURL, true);
    request.responseType = "arraybuffer";


    request.onload = function() {
      context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            $('#info').text('Error decoding file data');
            return;
          }

          sourceJs = context.createJavaScriptNode(2048);
          sourceJs.buffer = buffer;
          sourceJs.connect(context.destination);
          analyser = context.createAnalyser();
          analyser.smoothingTimeConstant = 0.6;
          //takes a complex waveform and converts it from a single signal 
          //to information about the frequency components
          analyser.fftSize = 512;

          source = context.createBufferSource();
          source.buffer = buffer;
          source.loop = true;

          source.connect(analyser);
          analyser.connect(sourceJs);
          source.connect(context.destination);


          this.sourceJs.onaudioprocess = function(e) {
            PV.Audio.soundArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(PV.Audio.soundArray);
            this.boost = 0;
            for (var i = 0; i < PV.Audio.soundArray.length; i++) {
              PV.Audio.boost += PV.Audio.soundArray[i];
            }
            PV.Audio.boost = PV.Audio.boost / PV.Audio.soundArray.length;
          };
          $('#load').hide();
          play();

        }
      );
    };
    request.send();

    function play() {
      source.noteOn(0);
    }
  }
}