FW.Camera = class Camera
  constructor: ()->
    @camFar = 2000000
    @camStartingY = 8
    @startingRotationScene1 = -Math.PI/8
    @endingRotationScene1 = -Math.PI/2.2
    
    FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @camStartingY, FW.width/2
    FW.camera.rotation.y = -Math.PI/8






  resize: ->
    FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  scene1Update:->
    @camSpeed = FW.sunsetSpeed
    FW.camera.position.z -= @camSpeed
    FW.camera.rotation.y = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum, @startingRotationScene1, @endingRotationScene1)

  scene2Update: ->
    FW.camera.translateZ -FW.scene2.camSpeed
    FW.scene2.camSpeed += FW.scene2.camAcceleration

  scene3Update: ->
    currentTime = Date.now()
    FW.camera.translateZ -FW.scene3.camSpeed
    FW.scene3.camSpeed += FW.scene3.camAcceleration
    FW.camera.rotation.x = map(currentTime, FW.scene3.startTime, FW.scene3.endTime, FW.scene3.camRotStartX, FW.scene3.camRotEndX)