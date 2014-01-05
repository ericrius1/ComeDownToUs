FW.Camera = class Camera
  constructor: ()->
    @camSpeedupFactor = 1.001

    @camFar = 2000000
    @camStartingY = 8
    
    FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @camStartingY, FW.height

    @scene4Velocity = -1
    @scene4Acceleration = -.01



 

  resize: ->
    FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  scene1Update:->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, FW.scene1.startZ, FW.scene1.endZ)

  scene2Update: ->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, FW.scene2.startZ, FW.scene2.endZ)

  scene3Update: ->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene3.startTime, FW.scene3.endTime, FW.scene3.startZ, FW.scene3.endZ)

  scene4Update: ->
    FW.camera.position.z += @scene4Velocity
    @scene4Velocity += @scene4Acceleration

  scene5Update: ->
    FW.camera.position.z += @scene4Velocity
