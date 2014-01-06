FW.Camera = class Camera
  constructor: ()->
    @camSpeedupFactor = 1.001

    @camFar = 2000000
    @startCamHeight = 8
    
    FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @startCamHeight, FW.scene1.startZ


    @scene3Velocity = -1
    @scene3Acceleration = -.0015

    
    @scene4Acceleration = -.05
    @maxFinalVelocity = -10

  resize: ->
    FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  scene1Update:->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, FW.scene1.startZ, FW.scene1.endZ)

  scene2Update: ->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, FW.scene2.startZ, FW.scene2.endZ)

  #Immediately following fireflies
  #END: "Dont be afraid to step intp the unknown"
  scene3Update: ->
    currentTime = Date.now()
    FW.camera.translateZ @scene3Velocity
    @scene3Velocity += @scene3Acceleration

    FW.camera.position.y = map(currentTime, FW.scene3.startTime, FW.scene3.endTime, @startCamHeight, FW.wormHole.height)

  #Go to hyperspace!
  scene4Update: ->
    FW.camera.position.z += FW.scene4.startVelocity
    FW.scene4.startVelocity =  Math.max(@maxFinalVelocity, (FW.scene4.startVelocity + @scene4Acceleration))

  #Finish fading music, The End
  scene5Update: ->
    FW.camera.position.z += FW.scene4.startVelocity
