FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .008
    @currentBeatNum = 0
    @totalBeats = 20
    @xSpread = FW.width/2
    @distanceFromCam = @xSpread * .2
    @numEmitters = @totalBeats
    @timeTillDisabled = 1000


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
    color = new THREE.Color()
    pps = 10000
    colorSpread = new THREE.Vector3 0, 0, 0
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: pps
      size: 10
      sizeEnd: 10
      colorStart: color
      colorSpread: colorSpread
      # colorEnd: color
      positionSpread: new THREE.Vector3 @xSpread, 0, @xSpread
      velocity: new THREE.Vector3 30, 80, 0
      velocitySpread: new THREE.Vector3 2, 20, 4
      acceleration: new THREE.Vector3 5, -70, 0
      # accelerationSpread: new THREE.Vector3 0, 0, 4
      opacityStart: 0.8
      opacityEnd: 0.8

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  run : ->
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
    setTimeout(()=>
      @run()
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
    


