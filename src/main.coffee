#Meteors fly over everytime she says "come down to us"
#When step off cliff, rotate camera facing down and fly downwards (or up?)()

if !Detector.webgl
   Detector.addGetWebGLMessage()

window.FW = {}
SC?.initialize({
    client_id: "7da24ca214bf72b66ed2494117d05480",
});

FW.sfxVolume = 0.2
FW.globalTick = 0.16
FW.development = false
window.soundOn = !FW.development

window.onload = ->
  FW.myDirector = new FW.Director()
  FW.main = new FW.Main()
  FW.myWorld = new FW.World()
  FW.myWorld.animate()

  
  document.addEventListener( 'keydown', FW.main.onKeyDown, false );

FW.Main = class Main
  constructor: ->
    #Put a sound you want from soundcloud here
    # FW.myDirector.beginShow Date.now()
    SC.stream "/tracks/come-down-to-us", (song)->
      FW.song = song
      songStartTime = Date.now()
      FW.myDirector.beginShow songStartTime
      if soundOn
        FW.song.play()

  onKeyDown: (event)->
    if event.keyCode is 32
      FW.myDirector.freeze()

   





