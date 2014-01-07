FW.Director = class Director
  constructor: ->
    @music = true
    short = false
    
    @scene1TotalTime  = 155550
    @scene2TotalTime = 67000
    @scene3TotalTime = 33930
    @scene4TotalTime = 20000
    @scene5TotalTime = 10000
    @startRaiseBridgeTime = 127500
    @setSongPoint = false
    

    if short
      @setSongPoint = true
      @scene1TotalTime = 3000
      @scene2TotalTime = 67000
      @scene3TotalTime = 3000
      @scene4TotalTime = 20000
      @scene5TotalTime = 2000
      @startRaiseBridgeTime = 2000
      @endRaiseBridgeTime = 10000


    @skyColor = new THREE.Color()
    @frozen = false
    # CONTROLS

    @startSkyHue = 0.12
    @endSkyHue = -0.18
    @startSkyLight = 0.5
    @endSkyLight = 0.15

    @currentScene = FW.scene1
    @skyColor.setHSL @startSkyHue, 0.86, @startSkyLight
    
    FW.beatInterval = 3530

  #INITIALIZE SCENES
  FW.scene1 =
    startZ: FW.height * 0.25
    endZ: FW.height * 0.2
    totalTime: @scene1TotalTime

  FW.scene2 = 
    songPoint: 154550
    startZ: FW.scene1.endZ
    endZ: -FW.width/2 + 1000
    totalTime: @scene2TotalTime

  FW.scene3 = 
    songPoint: 221600
    startZ: FW.scene2.endZ
    endZ: -FW.height/2 +200
    totalTime: @scene3TotalTime

  FW.scene4 = 
    songPoint: 253930
    startVolume: 100
    endVolume: 20
    totalTime: @scene4TotalTime

  FW.scene5 =
    startVolume: FW.scene4.endVolume
    endVolume: 0
    totalTime: @scene5TotalTime
  FW.scene6 = {}



  run: =>
    requestAnimationFrame @run
    FW.myWorld.render()
    if !@frozen
      #only update time if we are running the show!
      @currentScene?.update()
    else
      FW.controls.update()

  #SET UP SCENE TIMES #############################################
  beginShow : ->
    if !@music
      FW.song.pause()
    startTime = Date.now()
    FW.scene1.startTime = startTime
    FW.scene1.totalTime =  @scene1TotalTime
    FW.scene1.endTime =  startTime + @scene1TotalTime

    FW.scene1.startRaiseBridgeTime = startTime + @startRaiseBridgeTime
    FW.scene1.endRaiseBridgeTime = FW.scene1.endTime

    FW.scene2.startTime= FW.scene1.endTime
    FW.scene2.endTime= FW.scene1.endTime + @scene2TotalTime
    FW.scene2.totalTime= @scene2TotalTime

    FW.scene3.startTime =  FW.scene2.endTime
    FW.scene3.totalTime = @scene3TotalTime
    FW.scene3.endTime = FW.scene2.endTime + @scene3TotalTime

    FW.scene4.startTime = FW.scene3.endTime
    FW.scene4.totalTime = @scene4TotalTime
    FW.scene4.endTime = FW.scene3.endTime + @scene4TotalTime

    FW.scene5.startTime = FW.scene4.endTime
    FW.scene5.endTime = FW.scene4.endTime + FW.scene5.totalTime 


    FW.scene1.update = =>
      currentTime = Date.now()
      hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyHue, @endSkyHue )
      light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyLight, @endSkyLight )
      @skyColor.setHSL hue, 0.86, light
      FW.renderer.setClearColor @skyColor
      FW.mySun.scene1Update()  
      FW.myCamera.scene1Update()

      #Raise bridge
      if currentTime > FW.scene1.startRaiseBridgeTime
        FW.myTerrain.raiseBridge(currentTime)
      if currentTime > FW.scene1.endTime
        @initScene2()
    FW.scene2.update = =>
      currentTime = Date.now()
      FW.fireflies.tick()
      FW.mySun.scene2Update()
      FW.myCamera.scene2Update()
      light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime,  @endSkyLight, 0 )
      @skyColor.setHSL @endSkyHue, 0.86, light
      FW.renderer.setClearColor @skyColor
      if currentTime > FW.scene2.endTime
        @initScene3()
    FW.scene3.update = =>
      currentTime = Date.now()
      FW.myCamera.scene3Update()
      FW.wormHole.tick()
      if currentTime > FW.scene3.endTime
        @initScene4()
    FW.scene4.update = =>
      currentTime = Date.now()
      FW.wormHole.tick()
      FW.myCamera.scene4Update()
      volume = map(currentTime, FW.scene4.startTime, FW.scene4.endTime, 100, 0)
      FW.song.setVolume volume
      if currentTime > FW.scene4.endTime
        @initScene5()
    FW.scene5.update = =>
      FW.myCamera.scene5Update()
      currentTime = Date.now()
      volume = map(currentTime, FW.scene5.startTime, FW.scene5.endTime, FW.scene5.startVolume, FW.scene5.endVolume)
      FW.song.setVolume volume
      FW.wormHole.tick() 
      if currentTime > FW.scene5.endTime
        FW.wormHole.disperse()
        @currentScene = FW.scene6
        
      FW.scene6.update = =>
        FW.myCamera.scene5Update()


    @currentScene = FW.scene1
    @run()

    
  freeze : -> 

    @frozen = !@frozen
    FW.controls.enabled = !FW.controls.enabled
    FW.controls.target.z = FW.camera.position.z - 30    
    if @frozen
      FW.song.pause()
    else
      FW.song.play()


  initScene2: ->
    #TRIGGER SONG JUMP HERE ************************
    if @setSongPoint == true
      FW.song.setPosition FW.scene2.songPoint
    @currentScene = FW.scene2
    FW.fireflies.runScene2()
    FW.scene.remove FW.mySun.sunMesh

  initScene3: ->
    if @setSongPoint == true
      FW.song.setPosition FW.scene3.songPoint
    FW.camera.rotation.order = 'YXZ';
    clearTimeout FW.scene2.fireflyInterval
    FW.fireflies.erase()
    FW.wormHole.activate()
    @currentScene = FW.scene3

  initScene4: ->
    if @setSongPoint == true
      FW.song.setPosition FW.scene4.songPoint
    FW.scene4.startVelocity = FW.myCamera.scene3Velocity
    @currentScene = FW.scene4

  initScene5: ->
    @currentScene = FW.scene5


