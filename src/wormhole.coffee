FW.WormHole = class WormHole
  constructor: ()->
    @tickTime = 0.01
    @distanceFromCam = 50

    @wormHoleGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 2
    });

    @generateWormHole()
    @wormHoleGroup.mesh.renderDepth = -3
    FW.scene.add(@wormHoleGroup.mesh)


  generateWormHole: ->
    @wormHoleEmitter = new ShaderParticleEmitter
      particlesPerSecond: 10000
      position: new THREE.Vector3 0, 10, FW.scene3.startZ
      positionSpread: new THREE.Vector3 1000, 100, 1000
      velocity: new THREE.Vector3 0, 0, -200
      acceleration: new THREE.Vector3 0, 0, 100

    @wormHoleGroup.addEmitter @wormHoleEmitter
    @wormHoleEmitter.disable()


  activate: ->
    @wormHoleEmitter.enable()

  disperse: ->
    @wormHoleEmitter.disable()

  tick: ->
    @wormHoleEmitter.position.z = FW.camera.position.z - @distanceFromCam
    @wormHoleGroup.tick(@tickTime)
 