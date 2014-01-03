FW.Camera = class Camera
  constructor: ()->
    @camFar = 2000000
    @camStartingY = 8
    @startingRotation = -Math.PI/8
    @endingRotation = -Math.PI/2.2
    
    FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @camStartingY, FW.width/2
    FW.camera.rotation.y = -Math.PI/8




  resize: ->
    FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  scene1Update:->
    @camSpeed = FW.sunsetSpeed
    FW.camera.position.z -= @camSpeed
    FW.camera.rotation.y = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum, @startingRotation, @endingRotation)

  scene2Update: ->
    FW.camera.translateZ -FW.scene2.camSpeed
    FW.scene2.camSpeed += FW.scene2.camAcceleration

  scene3Update: ->

    FW.camera.translateZ -FW.scene3.camSpeed
    FW.scene3.camSpeed += FW.scene3.camAcceleration
    FW.camera.rotation.x += FW.scene3.camYRotationSpeed