#Meteors fly over everytime she says "come down to us"
#When step off cliff, rotate camera facing down and fly downwards (or up?)()

#CONSTANTS
window.FW = {}
FW.width = 3000
FW.height = 12000

if !Detector.webgl
   Detector.addGetWebGLMessage()



FW.globalTick = 0.16

window.onload = ->
  FW.song = document.getElementById('song')
  FW.song.play()
  FW.myDirector = new FW.Director()
  FW.main = new FW.Main()
  FW.myWorld = new FW.World()
  FW.song.addEventListener('canplaythrough', ()=>
    console.log 'PLAY'
    songStartTime = Date.now()
    FW.myDirector.beginShow songStartTime
  )
  
  

  #document.addEventListener( 'keydown', FW.main.onKeyDown, false );

FW.Main = class Main
  constructor: ->
  onKeyDown: (event)->
    if event.keyCode is 32
      FW.myDirector.freeze()

   




