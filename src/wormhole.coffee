FW.WormHole = class WormHole
  constructor: ()->

    @wormHoleGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 5
    });

    @generateWormHole new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    @generateWormHole @light.color
    @wormHoleGroup.mesh.renderDepth = -3
    FW.scene.add(@wormHoleGroup.mesh)


  generateWormHole: (colorStart)->
    colorEnd = new THREE.Color(0xcd40c0)
    wormHoleEmitter = new ShaderParticleEmitter
      particlesPerSecond: 5000
      position: new THREE.Vector3 0, 10, FW.scene3.startZ

    @wormHoleGroup.addEmitter wormHoleEmitter
    # wormHoleEmitter.disable()



  tick: ->
    @wormHoleGroup.tick(@tickTime)
 