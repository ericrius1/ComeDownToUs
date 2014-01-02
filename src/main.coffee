#Meteors fly over everytime she says "come down to us"


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
  FW.main = new FW.Main()
  FW.myWorld = new FW.World()
  FW.myWorld.animate()

  
  document.addEventListener( 'keydown', FW.main.onKeyDown, false );

FW.Main = class Main
  constructor: ->
    if soundOn
      #Put a sound you want from soundcloud here
      SC.stream "/tracks/come-down-to-us", (sound)->
        if soundOn
          setTimeout(()=>
            sound.setPosition 154600
          2000)
          sound.play()

  onKeyDown: (event)->
    if event.keyCode is 32
      FW.myDirector.freeze()

   





