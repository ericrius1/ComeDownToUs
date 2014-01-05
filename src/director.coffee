FW.Director = class Director
  constructor: ->
    @music = false
    short = true
    
    @scene1TotalTime  = 155550
    @scene2TotalTime = 64450
    @setSongPoint = false
    

    if short
      @setSongPoint = true
      @scene1TotalTime = 3000
      @scene2TotalTime = 1000


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
    startZ: FW.height * 0.5
    endZ: FW.height * 0.2
  
  FW.scene2 = 
    songPoint: 154600
    startZ: FW.scene1.endZ
    endZ: -FW.width/2 + 1000

  scene3TotalTime = 33930
  FW.scene3 = 
    songPoint: 220000
    startZ: FW.scene2.endZ
    endZ: -FW.height/2 + 100
    camAcceleration: .0001

  scene4TotalTime = 10000
  FW.scene4 = 
    songPoint: 255100

  run: =>
    requestAnimationFrame @run
    FW.myWorld.render()
    if !@frozen
      #only update time if we are running the show!
      @currentScene?.update()
    else
      FW.controls.update()

  #SET UP SCENE TIMES
  beginShow : ->
    if !@music
      FW.song.pause()
    startTime = Date.now()
    FW.scene1.startTime = startTime
    FW.scene1.totalTime =  @scene1TotalTime
    FW.scene1.endTime =  startTime + @scene1TotalTime

    FW.scene2.startTime= FW.scene1.endTime
    FW.scene2.endTime= FW.scene1.endTime + @scene2TotalTime
    FW.scene2.totalTime= @scene2TotalTime

    FW.scene3.startTime =  FW.scene2.endTime
    FW.scene3.totalTime = scene3TotalTime
    FW.scene3.endTime = FW.scene2.endTime + scene3TotalTime


    FW.scene1.update = =>
      currentTime = Date.now()
      hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyHue, @endSkyHue )
      light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyLight, @endSkyLight )
      @skyColor.setHSL hue, 0.86, light
      FW.renderer.setClearColor @skyColor
      FW.mySun.scene1Update()  
      FW.myCamera.scene1Update()
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
      FW.myCamera.scene3Update()
      FW.wormHole.tick()

    @currentScene = FW.scene1
    @run()

    
  freeze : -> 
    @frozen = !@frozen
    FW.controls.enabled = !FW.controls.enabled
    FW.controls.target.z = FW.camera.position.z - 30    


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
    FW.fireflies.disable()
    @currentScene = FW.scene3


