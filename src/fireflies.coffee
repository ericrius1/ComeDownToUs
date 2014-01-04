FW.Fireflies = class Fireflies
  constructor: ()->
    @distanceFromCam = 50
    @timeTillDisabled = 300

    @tickTime = .008
    @currentBeatNum = 0
    @totalBeats = 20
    @numEmitters = @totalBeats
    @xSpreadFactor = 100
    @emitterStats = []
    @ffToggledOn = false
    @ffHeight = 8

    #For custom emitters each beat!

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 10
    });
    @emitters = []
    @numActiveEmitters = 0
    for i in [0...@numEmitters]
      @generateFireflies(i)
    @specialLight = new THREE.PointLight @specialLightColor, 0, @specialLightDistance
    FW.scene.add @specialLight
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (currentIndex)->
    colorStart = new THREE.Color()
    colorEnd = new THREE.Color()
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 200
      size: 10
      sizeEnd: 10
      positionSpread: new THREE.Vector3 100, 5, 40
      velocity: new THREE.Vector3 0, 0, -50
      acceleration: new THREE.Vector3 0, 3, -5
      accelerationSpread: new THREE.Vector3 0, 2, 2
      opacityStart: 1.0
      opacityEnd: 1.0

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  runScene2 : ->
    @currentBeatNum++
    if @numActiveEmitters < @emitters.length
      @numActiveEmitters++
    #Only toggle on and off if we're still at part of song with constant beat, otherwise just turn on and keep on
    if @currentBeatNum < @totalBeats
      @toggleActiveEmitters()
    else
      @enableActiveEmitters()
    for i in [0...@numActiveEmitters]
      emitter = @emitters[i]
      emitter.position = new THREE.Vector3().copy FW.camera.position
      emitter.position.z -= @distanceFromCam
      emitter.position.y = @ffHeight
    FW.scene2.fireflyInterval = setTimeout(()=>
      @runScene2()
    FW.beatInterval)

    #Start dimming light halfway through beat, as the fireflies are falling back into the ocean
    setTimeout(()=>
      @specialLightGrowing = false
    FW.beatInterval/2)
 


  toggleActiveEmitters : ->
    @enableActiveEmitters()
    setTimeout(()=>
      @disableActiveEmitters()
    @timeTillDisabled)
    #Spawn more flies everytime
  
  enableActiveEmitters : ->
    @ffToggledOn = true
    for i in [0...@numActiveEmitters]
      emitter = @emitters[i]
      emitter.enable()
   
  disableActiveEmitters : ->
    @ffToggledOn = false
    for i in [0...@numActiveEmitters]
      @emitters[i].disable()


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
