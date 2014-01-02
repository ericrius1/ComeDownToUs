FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .016
    @numEmitters = 4
    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1
    });
    @emitters = []
    @currentEmitterIndex = 0
    for i in [0..@numEmitters]
      @generateFireflies(i)
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)
   

  generateFireflies: (currentIndex)->
    color = new THREE.Color()
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 100 * (1+currentIndex * currentIndex * 10)
      size: 10
      sizeEnd: 0
      colorStart: color
      colorEnd: color
      positionSpread: new THREE.Vector3 1000, 50, 1000
      velocitySpread: new THREE.Vector3 5, 5, 5
      opacityStart: 0.8
      opacityEnd: 0.5

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  

  activate : ->
    @enableEmitters()
    setTimeout(()=>
      @disableEmitters()
    1000)
    #Spawn more flies everytime
    setTimeout(()=>
      @activate()
    FW.scene2.beatInterval)


  enableEmitters : ->
    for emitter in @emitters
      emitter.position = FW.camera.position
      emitter.enable()
  
  disableEmitters : ->
    for emitter in @emitters
      emitter.disable()


  tick: ->
    @firefliesGroup.tick(@tickTime)
    


