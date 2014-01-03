FW.Fireflies = class Fireflies
  constructor: ()->
    @tickTime = .008
    @currentBeatNum = 0
    @totalBeats = 20
    @numEmitters = @totalBeats
    @xSpreadFactor = 100
    @distanceFromCam = 100
    @timeTillDisabled = 100
    @emitterStats = []
    @initEmitterStats()


    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 2.0
    });
    @emitters = []
    @numActiveEmitters = 0
    for i in [0...@numEmitters]
      @generateFireflies(i)
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (currentIndex)->
    defaultColorStart = new THREE.Color()
    colorStart = @emitterStats[currentIndex]?.colorStart ? defaultColorStart

    defaultColorEnd = new THREE.Color()
    colorEnd = @emitterStats[currentIndex]?.colorEnd ? defaultColorEnd
  

    defaultType = 'cube'
    type = @emitterStats[currentIndex]?.type ? defaultType

    defaultPps = 500
    pps = @emitterStats[currentIndex]?.pps ? defaultPps
    
    defaultSizeStart  = 10
    sizeStart = @emitterStats[currentIndex]?.sizeStart ? defaultSizeStart 

    defaultSizeEnd  = 10
    sizeEnd = @emitterStats[currentIndex]?.sizeEnd ? defaultSizeEnd

    defaultVelocity = new THREE.Vector3 30, 60, 0
    velocity = @emitterStats[currentIndex]?.velocity ? defaultVelocity

    defaultVelocitySpread = new THREE.Vector3 10, 10, 20
    velocitySpread = @emitterStats[currentIndex]?.velocitySpread ? defaultVelocitySpread

    defaultAcceleration = new THREE.Vector3 20, -35, 0
    acceleration = @emitterStats[currentIndex]?.acceleration ? defaultAcceleration

    defaultPositionSpread = new THREE.Vector3 @xSpreadFactor * currentIndex, 0, @xSpreadFactor * currentIndex
    positionSpread = @emitterStats[currentIndex]?.positionSpread ? defaultPositionSpread
    

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
      accelerationSpread: new THREE.Vector3 10, 0, 10
      opacityStart: 0.8
      opacityEnd: 0.8

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
      emitter.position.x += @distanceFromCam
      emitter.position.y = 0
    FW.scene2.fireflyInterval = setTimeout(()=>
      @runScene2()
    FW.beatInterval)




  toggleActiveEmitters : ->
    @enableActiveEmitters()
    setTimeout(()=>
      @disableActiveEmitters()
    @timeTillDisabled)
    #Spawn more flies everytime
  
  enableActiveEmitters : ->
    for i in [0...@numActiveEmitters]
      emitter = @emitters[i]
      emitter.enable()
   
  disableActiveEmitters : ->
    for i in [0...@numActiveEmitters]
      @emitters[i].disable()

  tick: ->
    @firefliesGroup.tick(@tickTime)

  initEmitterStats : ->
    #create a mapping of emitter num to stats
    color = new THREE.Color()
    emitterStat =
      # type: 'sphere'
      pps: 200
      sizeStart: 30
      sizeEnd: 30
      colorStart: new THREE.Color 0xdf1ed8
      colorEnd: new THREE.Color 0xdf1ed8
      velocity: new THREE.Vector3 30, 60, 0
      velocitySpread: new THREE.Vector3 10, 0, 10
      acceleration: new THREE.Vector3 20, -35, 0
      positionSpread: new THREE.Vector3 1, 1, 1
    @emitterStats.push emitterStat

    


