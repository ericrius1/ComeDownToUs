#Meteors fly over everytime she says "come down to us"
#When step off cliff, rotate camera facing down and fly downwards (or up?)()

#CONSTANTS
window.FW = {}
FW.width = 3000
FW.height = 12000

if !Detector.webgl
   Detector.addGetWebGLMessage()

SC?.initialize({
    client_id: "7da24ca214bf72b66ed2494117d05480",
});

FW.sfxVolume = 0.2
FW.globalTick = 0.16
FW.development = false

window.onload = ->
  FW.myDirector = new FW.Director()
  FW.main = new FW.Main()
  FW.myWorld = new FW.World()

  document.addEventListener( 'keydown', FW.main.onKeyDown, false );

FW.Main = class Main
  constructor: ->
    #Put a sound you want from soundcloud here
    # FW.myDirector.beginShow Date.now()
    SC.stream "/tracks/come-down-to-us", (song)->
      FW.song = song
      songStartTime = Date.now()
      FW.myDirector.beginShow songStartTime
      if !FW.development
        FW.song.play()

  onKeyDown: (event)->
    if event.keyCode is 32
      FW.myDirector.freeze()

   


#155550




