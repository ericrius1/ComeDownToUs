FW.Fireflies = class Fireflies
  constructor: ()->
    @tickTime = .008
    @currentBeatNum = 0
    @totalBeats = 20
    @numEmitters = @totalBeats
    @xSpreadFactor = 100
    @distanceFromCam = 200
    @timeTillDisabled = 1000
    @emitterStats = []
    @initEmitterStats()


    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1.5
    });
    @emitters = []
    @numActiveEmitters = 0
    for i in [0...@numEmitters]
      @generateFireflies(i)
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (currentIndex)->
    defaultColor = new THREE.Color()
    color = @emitterStats[currentIndex]?.color ? defaultColor
    colorEnd = new THREE.Color()
    colorEnd.setHSL 0.527, 0.80, 0.9

    defaultPps = 500
    pps = @emitterStats[currentIndex]?.pps ? defaultPps
    defaultSize  = 10
    size = @emitterStats[currentIndex]?.size ? defaultSize 

    defaultVelocity = new THREE.Vector3 60, 90, 0
    velocity = @emitterStats[currentIndex]?.velocity ? defaultVelocity
    

    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: pps
      size: size
      sizeEnd: size
      colorStart: color
      colorEnd: colorEnd
      positionSpread: new THREE.Vector3 @xSpreadFactor * currentIndex, 0, @xSpreadFactor * currentIndex
      velocity: velocity
      velocitySpread: new THREE.Vector3 10, 10, 20
      acceleration: new THREE.Vector3 50, -90, 0
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
      pps: 1
      size: 40
      color: new THREE.Color 0xdf1ed8
      velocity: new THREE.Vector3 60, 120, 0
    @emitterStats.push emitterStat

    


