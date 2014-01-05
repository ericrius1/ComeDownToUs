FW.Fireflies = class Fireflies
  constructor: ()->
    @distanceFromCam = 160
    @ffDisableTime = 1000
    @slowDownFactor = 0.05
    @tickTime = .16 * @slowDownFactor
    @ffToggledOn = false
    @ffHeight = 10
    @emitters = []
    @currentPosition = new THREE.Vector3()

    @ffVelocityZ = 0
    @lightVelocityZ = @ffVelocityZ
    @ffAccelZ = -2500




    #LIGHT
    @light = new THREE.PointLight 0xffffff, 2, 2000
    FW.scene.add @light
    @light.color.setRGB Math.random(), Math.random(), Math.random()
    @startLightIntensity = 5
    @endLightIntensity = 5
    @lightAccelZ = @ffAccelZ/10000

    @testMesh = new THREE.Mesh new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial()
    # FW.scene.add @testMesh
    #For custom emitters each beat!

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1
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
      sizeSpread: 20
      sizeEnd: 60
      colorStart: colorStart
      colorEnd: colorEnd
      positionSpread: new THREE.Vector3 FW.pillarPairDistance, 10, 10
      velocity: new THREE.Vector3 0, 0, @ffVelocityZ
      velocitySpread: new THREE.Vector3 10, 0, 0
      acceleration: new THREE.Vector3 0, 0, @ffAccelZ
      accelerationSpread: new THREE.Vector3 10, 10, 0 
      opacityStart: 1.0
      opacityEnd: 1.0

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  runScene2 : ->
    @currentPosition = new THREE.Vector3().copy FW.camera.position
    @currentPosition.z -= @distanceFromCam
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
    @light.position.z = @currentPosition.z
    @lightVelocityZ = @ffVelocityZ
    @light.position = @currentPosition

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
    @lightVelocityZ -= @lightAccelZ
    @light.position.z -= @lightVelocityZ
    @testMesh.position = @light.position