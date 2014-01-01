FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .004
    @numEmitters = 4
    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: .5
    });

    @generateFireflies()
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)
   

  generateFireflies: ->
    color = new THREE.Color()
    @firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 100
      size: 10
      sizeEnd: 0
      colorStart: color
      colorEnd: color
      positionSpread: new THREE.Vector3 1000, 50, 1000
      velocitySpread: new THREE.Vector3 5, 5, 5
      opacityEnd: 1

    @firefliesGroup.addEmitter @firefliesEmitter
    @firefliesEmitter.disable()

  

  activate : ->
    @firefliesEmitter.enable()

    @firefliesEmitter.position.set FW.camera.position.x, 10, FW.camera.position.z

    
  tick: ->
    @firefliesGroup.tick(@tickTime)
    


