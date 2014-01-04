FW.Camera = class Camera
  constructor: ()->
    @camSpeedupFactor = 1.001

    @camFar = 2000000
    @camStartingY = 8
    
    FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set  0, @camStartingY, FW.width/2

    @scene1StartZ = FW.width * 0.5
    @scene1EndZ = FW.width * 0.2

    @rotStartX = 0
    @rotEndX = Math.PI / 20

    @scene2StartZ = @scene1EndZ
    @scene2EndZ = -FW.width/2

  resize: ->
    FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()

  scene1Update:->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, @scene1StartZ, @scene1EndZ)

  scene2Update: ->
    currentTime = Date.now()
    FW.camera.position.z = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, @scene2StartZ, @scene2EndZ)

  scene3Update: ->
    currentTime = Date.now()
    FW.camera.rotation.x = map(currentTime, FW.scene3.startTime, FW.scene3.endTime, @rotStartX, @rotEndX)
