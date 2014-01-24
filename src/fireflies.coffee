FW.Fireflies = class Fireflies
  constructor: ()->
    @ffDistanceFromCam = 160
    @lightZOffsetFromFireFlies = 1000
    @ffDisableTime = 1000
    @slowDownFactor = 0.05
    @tickTime = .16 * @slowDownFactor
    @ffToggledOn = false
    @ffHeight = 11
    @emitters = []
    @currentPosition = new THREE.Vector3()

    @ffVelocityZ = 450
    @lightVelocityZ = 0
    @ffAccelZ = -2500


    #LIGHT
    @lightDistance = 2000
    @light = new THREE.PointLight 0xffffff, 0, @lightDistance
    FW.scene.add @light
    @light.color.setRGB Math.random(), Math.random(), Math.random()
    @startLightIntensity = 6
    @endLightIntensity = 4
    @lightAccelZ = @ffAccelZ/10000

    @testMesh = new THREE.Mesh new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial()
    # FW.scene.add @testMesh
    #For custom emitters each beat!

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1.5
    });

    @generateFireflies new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    @generateFireflies @light.color
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (colorStart)->
    colorEnd = new THREE.Color(0xcd40c0)
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 5000
      size: 30
      sizeSpread: 30
      sizeEnd: 30
      colorStart: colorStart
      colorEnd: colorEnd
      positionSpread: new THREE.Vector3 FW.pillarPairDistance, 10, 10
      velocity: new THREE.Vector3 0, 0, @ffVelocityZ
      velocitySpread: new THREE.Vector3 10, 30, 0
      acceleration: new THREE.Vector3 0, 0, @ffAccelZ
      accelerationSpread: new THREE.Vector3 10, 0, 0 
      opacityStart: 1.0
      opacityEnd: 1.0

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  runScene2 : ->
    @currentPosition = new THREE.Vector3().copy FW.camera.position
    @currentPosition.z -= @ffDistanceFromCam
    @currentPosition.y = @ffHeight
    @startBeatTime = Date.now()
    @lightBurst()
    @ffPulse()

    FW.scene2.fireflyInterval = setTimeout(()=>
      @runScene2()
    FW.beatInterval)

    
  ffPulse : ->
    for emitter in @emitters
      emitter.position = @currentPosition
      emitter.enable()

    #Disable after specified time
    setTimeout(()=>
      @disable()
    @ffDisableTime)

  disable: ->
    for emitter in @emitters
      emitter.disable()

  lightBurst: ->
    @light.position.z = @currentPosition.z  + @lightZOffsetFromFireFlies
    @lightVelocityZ = 0

    #Hack for decreasing light accel as we ge closer to mountains so the lighting stays in sync
    @lightAccelZ *= 0.99

  erase: ->
    @disable()
    FW.scene.remove @firefliesGroup.mesh


  tick: ->
    currentTime = Date.now()
    @firefliesGroup.tick(@tickTime)
    intensity = map(currentTime, @startBeatTime, @startBeatTime + FW.beatInterval * 0.8, @startLightIntensity, @endLightIntensity)
    @light.intensity = intensity
    @light.position.z -= @lightVelocityZ
    @lightVelocityZ -= @lightAccelZ
    @testMesh.position = @light.position