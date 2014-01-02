FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .016
    @currentBeatNum = 0
    @totalBeats = 20
    @numEmitters = @totalBeats
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
    # color.setRGB Math.random(), Math.random(), Math.random()
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 1000
      size: 10
      sizeEnd: 10
      colorStart: color
      colorEnd: color
      positionSpread: new THREE.Vector3 1000, 100, 1000
      velocity: new THREE.Vector3 20, 0, 0
      velocitySpread: new THREE.Vector3 2, 2, 2
      acceleration: new THREE.Vector3 5, 0, 0
      accelerationSpread: new THREE.Vector3 4, 4, 4
      opacityStart: 0.8
      opacityEnd: 0.2

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
      emitter.position.x += 100
    setTimeout(()=>
      @run()
    FW.scene2.beatInterval)

  toggleActiveEmitters : ->
    @enableActiveEmitters()
    setTimeout(()=>
      @disableActiveEmitters()
    FW.scene2.beatInterval/2)
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
    


