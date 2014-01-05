FW.WormHole = class WormHole
  constructor: ()->
    @tickTime = 0.005
    @heightAboveSurface = 75
    @zSpread = 5000
    @zDistanceFromCam = @zSpread/2
    @ySpread= 50
    @zAcceleration = -10

    @wormHoleGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 5
    });

    @generateWormHole()
    @wormHoleGroup.mesh.renderDepth = -3
    FW.scene.add(@wormHoleGroup.mesh)


  generateWormHole: ->
    colorStart = new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    colorEnd = new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    @wormHoleEmitter = new ShaderParticleEmitter
      particlesPerSecond: 40000
      size: 20
      sizeSpread: 20
      colorStart: colorStart
      colorSpread: new THREE.Vector3 Math.random(), Math.random(), Math.random()
      colorEnd: colorEnd
      position: new THREE.Vector3 0, @heightAboveSurface, FW.scene3.startZ + @zSpread/2
      positionSpread: new THREE.Vector3 300, @ySpread, @zSpread
      acceleration: new THREE.Vector3 0, 0, @zAcceleration

    @wormHoleGroup.addEmitter @wormHoleEmitter
    @wormHoleEmitter.disable()


  activate: ->
    @wormHoleEmitter.enable()

  disperse: ->
    @wormHoleEmitter.disable()

  tick: ->
    @wormHoleEmitter.position.z = FW.camera.position.z - @zDistanceFromCam
    @wormHoleGroup.tick(@tickTime)
 