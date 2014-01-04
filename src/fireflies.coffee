FW.Fireflies = class Fireflies
  constructor: ()->
    @distanceFromCam = 70
    @timeTillDisabled = 1000
    @tickTime = .008
    @ffToggledOn = false
    @ffHeight = 8
    @emitters = []
    @currentPosition = new THREE.Vector3()

    #LIGHT
    @light = new THREE.PointLight 0xffffff, 2, 2000
    @light.position = @currentPosition
    FW.scene.add @light

    #For custom emitters each beat!

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 5
    });

    @generateFireflies new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    @generateFireflies new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (colorStart)->
    colorEnd = new THREE.Color(0xcd40c0)
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 10000
      size: 20
      sizeSpread: 10
      sizeEnd: 5
      colorStart: colorStart
      colorEnd: colorEnd
      positionSpread: new THREE.Vector3 750, 10, 100
      velocitySpread: new THREE.Vector3 50, 50, 50
      acceleration: new THREE.Vector3 0, 50, -200
      accelerationSpread: 10, 50, -100
      opacityStart: 1.0
      opacityEnd: 1.0

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()
    firefliesEmitter.position = @currentPosition

  runScene2 : ->
    @currentPosition = new THREE.Vector3().copy FW.camera.position
    @currentPosition.z -= @distanceFromCam
    @currentPosition.y = @ffHeight
    @enable()
    @createLightBurst()

    #Disable after specified time
    setTimeout(()=>
      @disable()
    @timeTillDisabled)

    FW.scene2.fireflyInterval = setTimeout(()=>
      @runScene2()
    FW.beatInterval)

    
  enable : ->
    @position = new THREE.Vector3().copy FW.camera.position
    for emitter in @emitters
      emitter.enable()

  disable: ->
    for emitter in @emitters
      emitter.disable()

  createLightBurst: ->
    @light.intensity = 10



  tick: ->
    @firefliesGroup.tick(@tickTime)


    
    

#SPIRIT BEING IN CAVERN
 # positionSpreadFactor = map currentIndex, 0, @numEmitters, 0, 1000
 #    colorStart = new THREE.Color()
 #    colorEnd = new THREE.Color()
 #    firefliesEmitter = new ShaderParticleEmitter
 #      particlesPerSecond: 1000
 #      size: 10
 #      sizeEnd: 10
 #      # positionSpread: new THREE.Vector3 positionSpreadFactor, rnd(1, 2), 1
 #      positionSpread: new THREE.Vector3 10, 10, 10
 #      velocitySpread: new THREE.Vector3 10, 10, 10
 #      opacityStart: 0.8
 #      opacityEnd: 0.8
