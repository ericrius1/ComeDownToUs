FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .008
    @numEmitters = 4
    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1
    });

    for i in [0..@numEmitters]
      @generateFireflies()
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)
   

  generateFireflies: ->
    color = new THREE.Color()
    @firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 1000
      size: 10
      sizeEnd: 0
      colorStart: color
      colorEnd: color
      positionSpread: new THREE.Vector3 1000, 50, 1000
      velocitySpread: new THREE.Vector3 5, 5, 5
      opacityEnd: 1

    @firefliesGroup.addEmitter @firefliesEmitter

  

  activate : ->
    @firefliesEmitter.position.set FW.camera.position.x, 10, FW.camera.position.z

    
  tick: ->
    @firefliesGroup.tick(@tickTime)
    


