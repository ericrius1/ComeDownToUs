FW.Fireflies = class Fireflies
  constructor: ()->
    @distanceFromCam = 50
    @tickTime = .008
    @currentBeatNum = 0
    @totalBeats = 20
    @numEmitters = @totalBeats
    @xSpreadFactor = 100
    @timeTillDisabled = 50
    @emitterStats = []
    @ffToggledOn = false
    @specialLightIntensityUpChange = 0.0
    @specialLightIntensityDownChange = 0.0
    @specialLightIntensityStart = 2.0
    @specialLightGrowing = false
    @specialLightDistance = 2500
    @specialLightColor = 0xdf1ed8

    @ffForwardAccel = 50

    #For custom emitters each beat!
    @initEmitterStats()

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 5
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
    defaultColorStart = new THREE.Color()
    colorStart = @emitterStats[currentIndex]?.colorStart ? defaultColorStart

    defaultColorEnd = new THREE.Color()
    colorEnd = @emitterStats[currentIndex]?.colorEnd ? defaultColorEnd
  

    defaultType = 'cube'
    type = @emitterStats[currentIndex]?.type ? defaultType

    defaultPps = 1000
    pps = @emitterStats[currentIndex]?.pps ? defaultPps
    
    defaultSizeStart  = 10
    sizeStart = @emitterStats[currentIndex]?.sizeStart ? defaultSizeStart 

    defaultSizeEnd  = 10
    sizeEnd = @emitterStats[currentIndex]?.sizeEnd ? defaultSizeEnd


    positionSpreadFactor =  map currentIndex, 1, @numEmitters, 0, 500
    defaultPositionSpread = new THREE.Vector3 0, 5, positionSpreadFactor
    positionSpread = @emitterStats[currentIndex]?.positionSpread ? defaultPositionSpread

    defaultVelocity = new THREE.Vector3 100, 0, 0
    velocity = @emitterStats[currentIndex]?.velocity ? defaultVelocity

    defaultVelocitySpread = new THREE.Vector3 0, 0, 0
    velocitySpread = @emitterStats[currentIndex]?.velocitySpread ? defaultVelocitySpread

    defaultAcceleration = new THREE.Vector3 @ffForwardAccel, 0, 0
    acceleration = @emitterStats[currentIndex]?.acceleration ? defaultAcceleration

    defaultAccelerationSpread = new THREE.Vector3 0, 0, 100
    accelerationSpread = @emitterStats[currentIndex]?.accelerationSpread ? defaultAccelerationSpread

    firefliesEmitter = new ShaderParticleEmitter
      type: type
      particlesPerSecond: pps
      size: sizeStart
      sizeEnd: sizeEnd
      colorStart: colorStart
      colorEnd: colorEnd
      positionSpread: positionSpread
      velocity: velocity
      velocitySpread: velocitySpread
      acceleration: acceleration
      accelerationSpread: accelerationSpread
      opacityStart: 0.8
      opacityEnd: 0.8

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  runScene2 : ->
    @specialLight.position.x = @distanceFromCam
    #burst of light to get things going
    @specialLight.intensity = @specialLightIntensityStart
    @specialLightGrowing = true
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
      emitter.position.x += @distanceFromCam
      emitter.position.y =  1
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
    for i in [1...@numActiveEmitters]
      emitter = @emitters[i]
      emitter.enable()
   
  disableActiveEmitters : ->
    @ffToggledOn = false
    for i in [0...@numActiveEmitters]
      @emitters[i].disable()


  tick: ->
    @specialLight.position.x +=10

    @firefliesGroup.tick(@tickTime)
    if @specialLightGrowing
      @specialLight.intensity += @specialLightIntensityUpChange
    else
      @specialLight.intensity -= @specialLightIntensityDownChange

  initEmitterStats : ->
    #create a mapping of emitter num to stats
    color = new THREE.Color()
    emitterStat =
      # type: 'sphere'
      pps: 2000
      sizeStart: 10
      sizeEnd: 10
      colorStart: new THREE.Color @specialLightColor
      colorEnd: new THREE.Color @specialLightColor
      velocity: new THREE.Vector3 10, 100, 0
      velocitySpread: new THREE.Vector3 1, 0, 1
      acceleration: new THREE.Vector3 10, -100, 0
      accelerationSpread: new THREE.Vector3 0, 0, 0
      positionSpread: new THREE.Vector3 1, 1, 1
    @emitterStats.push emitterStat

    
    


