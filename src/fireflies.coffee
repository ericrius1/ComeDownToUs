FW.Fireflies = class Fireflies
  constructor: ()->
    @distanceFromCam = 50
    @tickTime = .008
    @currentBeatNum = 0
    @totalBeats = 20
    @numEmitters = @totalBeats
    @xSpreadFactor = 100
    @timeTillDisabled = 50
    @emitterStats = []
    @ffToggledOn = false
    @specialLightIntensityUpChange = 0.0
    @specialLightIntensityDownChange = 0.0
    @specialLightIntensityStart = 2.0
    @specialLightGrowing = false
    @specialLightDistance = 2500
    @specialLightColor = 0xffffff


    @ffVelocity = 200
    @ffForwardAccel = 50
    @specialLightVelocity = @ffVelocity * .001
    @specialLightAccel = @ffForwardAccel * .004

    #For custom emitters each beat!

    @firefliesGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('assets/firefly.png')
      maxAge: 5
    });
    @emitters = []
    @numActiveEmitters = 0
    for i in [0...@numEmitters]
      @generateFireflies(i)
    @specialLight = new THREE.PointLight @specialLightColor, 0, @specialLightDistance
    FW.scene.add @specialLight
    @firefliesGroup.mesh.renderDepth = -3
    FW.scene.add(@firefliesGroup.mesh)


  generateFireflies: (currentIndex)->
    positionSpreadFactor = map currentIndex, 0, @numEmitters, 0, 1000
    colorStart = new THREE.Color()
    colorEnd = new THREE.Color()
    firefliesEmitter = new ShaderParticleEmitter
      particlesPerSecond: 1000
      size: 10
      sizeEnd: 10
      positionSpread: new THREE.Vector3 10, rnd(2, 5), positionSpreadFactor
      velocity: new THREE.Vector3 @ffVelocity, 20, 0
      acceleration: new THREE.Vector3 @ffForwardAccel, -10, 0
      accelerationSpread: new THREE.Vector3 0, 0, 10
      opacityStart: 0.8
      opacityEnd: 0.8

    @firefliesGroup.addEmitter firefliesEmitter
    @emitters.push firefliesEmitter
    firefliesEmitter.disable()

  runScene2 : ->
    @specialLight.position.x = @distanceFromCam
    @specialLightVelocity = @ffVelocity * .01
    #burst of light to get things going
    @specialLight.intensity = @specialLightIntensityStart
    @specialLightGrowing = true
    @currentBeatNum++
    if @numActiveEmitters < @emitters.length
      @numActiveEmitters++
    #Only toggle on and off if we're still at part of song with constant beat, otherwise just turn on and keep on
    if @currentBeatNum < @totalBeats
      @toggleActiveEmitters()
    else
      @enableActiveEmitters()
    for i in [0...@numActiveEmitters]
      emitter = @emitters[i]
      emitter.position = new THREE.Vector3().copy FW.camera.position
      emitter.position.x += @distanceFromCam
      emitter.position.y =  1
    FW.scene2.fireflyInterval = setTimeout(()=>
      @runScene2()
    FW.beatInterval)

    #Start dimming light halfway through beat, as the fireflies are falling back into the ocean
    setTimeout(()=>
      @specialLightGrowing = false
    FW.beatInterval/2)
 


  toggleActiveEmitters : ->
    @enableActiveEmitters()
    setTimeout(()=>
      @disableActiveEmitters()
    @timeTillDisabled)
    #Spawn more flies everytime
  
  enableActiveEmitters : ->
    @ffToggledOn = true
    for i in [0...@numActiveEmitters]
      emitter = @emitters[i]
      emitter.enable()
   
  disableActiveEmitters : ->
    @ffToggledOn = false
    for i in [0...@numActiveEmitters]
      @emitters[i].disable()


  tick: ->
    @specialLight.position.x += @specialLightVelocity
    @specialLightVelocity += @specialLightAccel 

    @firefliesGroup.tick(@tickTime)
    if @specialLightGrowing
      @specialLight.intensity += @specialLightIntensityUpChange
    else
      @specialLight.intensity -= @specialLightIntensityDownChange


    
    


