FW.WormHole = class WormHole
  constructor: ()->
    @tickTime = 0.001

    @wormHoleGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 1
    });

    @generateWormHole()
    @wormHoleGroup.mesh.renderDepth = -3
    FW.scene.add(@wormHoleGroup.mesh)


  generateWormHole: ->
    wormHoleEmitter = new ShaderParticleEmitter
      particlesPerSecond: 5000
      size: 20
      position: new THREE.Vector3 0, 10, FW.scene3.startZ
      positionSpread: new THREE.Vector3 1000, 10, 1000

    @wormHoleGroup.addEmitter wormHoleEmitter
    # wormHoleEmitter.disable()


  tick: ->
    @wormHoleGroup.tick(@tickTime)
 