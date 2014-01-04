FW.Fireflies = class Fireflies
  constructor: ()->
    @distanceFromCam = 50
    @timeTillDisabled = 300

    @tickTime = .008
    @ffToggledOn = false
    @ffHeight = 8

    #For custom emitters each beat!

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 10
    });

    @generateFireflies()
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: ->
    colorStart = new THREE.Color()
    colorEnd = new THREE.Color()
    @firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 6000
      size: 10
      sizeEnd: 40
      positionSpread: new THREE.Vector3 200, 5, 40
      velocity: new THREE.Vector3 0, 0, -50
      velocitySpread: new THREE.Vector3 10, 7, 10
      acceleration: new THREE.Vector3 0, 4, -5
      accelerationSpread: 10, 2, 0
      opacityStart: 1.0
      opacityEnd: 1.0

    @firefliesGroup.addEmitter @firefliesEmitter
    @firefliesEmitter.disable()

  runScene2 : ->
    @firefliesEmitter.position = new THREE.Vector3().copy FW.camera.position
    @firefliesEmitter.position.z -= @distanceFromCam
    @firefliesEmitter.position.y = @ffHeight
    @firefliesEmitter.enable()

    #Disable after specified time
    setTimeout(()=>
      @firefliesEmitter.disable()
    @timeTillDisabled)

    FW.scene2.fireflyInterval = setTimeout(()=>
      @runScene2()
    FW.beatInterval)

    
 


  tick: ->
    @firefliesGroup.tick(@tickTime)


    
    

#SPIRIT BEING IN CAVERN
 # positionSpreadFactor = map currentIndex, 0, @numEmitters, 0, 1000
 #    colorStart = new THREE.Color()
 #    colorEnd = new THREE.Color()
 #    firefliesEmitter = new ShaderParticleEmitter
 #      particlesPerSecond: 1000
 #      size: 10
 #      sizeEnd: 10
 #      # positionSpread: new THREE.Vector3 positionSpreadFactor, rnd(1, 2), 1
 #      positionSpread: new THREE.Vector3 10, 10, 10
 #      velocitySpread: new THREE.Vector3 10, 10, 10
 #      opacityStart: 0.8
 #      opacityEnd: 0.8
