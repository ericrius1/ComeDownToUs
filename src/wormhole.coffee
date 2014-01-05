FW.WormHole = class WormHole
  constructor: ()->
    @tickTime = 0.08
    @height = 75
    @ySpread= 50
    @zSpread = FW.height/2
    @zDistanceFromCam = @zSpread/2

    @wormHoleGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 10
      blending: THREE.AdditiveBlending
    });

    @generateWormHole()
    @wormHoleGroup.mesh.renderDepth = -3
    FW.scene.add(@wormHoleGroup.mesh)


  generateWormHole: ->
    colorStart = new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    colorEnd = new THREE.Color().setRGB Math.random(), Math.random(), Math.random()
    @wormHoleEmitter = new ShaderParticleEmitter
      particlesPerSecond: 10000
      size: 10
      sizeSpread: 10
      sizeEnd: 1
      colorStart: colorStart
      colorSpread: new THREE.Vector3 Math.random(), Math.random(), Math.random()
      colorEnd: colorEnd
      position: new THREE.Vector3 0, @height, FW.scene3.startZ + @zSpread/2
      positionSpread: new THREE.Vector3 200, @ySpread, @zSpread
      velocity: new THREE.Vector3 0, 0, -50
      acceleration: new THREE.Vector3 0, 0, 0
      opacityEnd: 1

    @wormHoleGroup.addEmitter @wormHoleEmitter
    @wormHoleEmitter.disable()


  activate: ->
    @wormHoleEmitter.enable()

  disperse: ->
    @wormHoleEmitter.disable()

  tick: ->
    @wormHoleEmitter.position.z = FW.camera.position.z - @zDistanceFromCam
    @wormHoleGroup.tick(@tickTime)
 