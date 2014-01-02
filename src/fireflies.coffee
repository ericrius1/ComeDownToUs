FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .016
    @numEmitters = 4
    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1.5
    });
    @emitters = []
    @numActiveEmitters = 0
    for i in [0..@numEmitters]
      @generateFireflies(i)
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (currentIndex)->
    color = new THREE.Color()
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 10 * (1+currentIndex * currentIndex * 10)
      size: 10
      sizeEnd: 10
      colorStart: color
      colorEnd: color
      positionSpread: new THREE.Vector3 1000, 100, 1000
      velocity: new THREE.Vector3 3, 0, 0
      accelerationSpread: new THREE.Vector3 5, 5, 5
      opacityStart: 0.8
      opacityEnd: 0.2

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  awaken : ->
    if @numActiveEmitters < @emitters.length
      @numActiveEmitters++
    @toggleActiveEmitters()
    setTimeout(()=>
      @awaken()
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
      emitter.position = new THREE.Vector3().copy FW.camera.position
      emitter.position.x += 10
      emitter.enable()
   
  disableActiveEmitters : ->
    for i in [0...@numActiveEmitters]
      @emitters[i].disable()

  tick: ->
    @firefliesGroup.tick(@tickTime)
    


