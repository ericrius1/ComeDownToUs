FW.Camera = class Camera
  constructor: ()->
    @camFar = 2000000
    @camSpeedFactor = 0.8
    @camStartingY = 8
    
    FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @camStartingY, FW.width/2


  resize: ->
    FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  update:->
    @camSpeed = FW.sunsetSpeed * @camSpeedFactor
    FW.camera.position.z -= @camSpeed
    @yRotation = map(FW.sunLight.position.y, FW.sunStartingHeight, -5000, -Math.PI/8, -Math.PI/3)
    FW.camera.rotation.y = @yRotation

