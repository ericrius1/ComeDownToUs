FW.Fireflies = class Fireflies
  rnd = FW.rnd
  constructor: ()->
    @tickTime = .008
    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1
    });

    @generateFireflies()
    FW.scene.add(@firefliesGroup.mesh)
   

  generateFireflies: ->
    color = new THREE.Color()
    @firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 10000
      size: 5
      sizeEnd: 1
      colorStart: color
      colorEnd: color
      positionSpread: new THREE.Vector3 1000, 20, 1000
      velocitySpread: new THREE.Vector3 5, 5, 5
      opacityEnd: 1



     
    
    @firefliesGroup.addEmitter @firefliesEmitter
  

  activate : ->
    @firefliesEmitter.position.set FW.camera.position.x, 20, FW.camera.position.z

    
  tick: ->
    @firefliesGroup.tick(@tickTime)
    


