FW.Director = class Director
  constructor: ->
    # @scene1TotalTime  = 155500
    # FW.sunsetSpeed = 0.215
    # @setSongPoint = false
    @scene1TotalTime = 10000
    FW.sunsetSpeed = 1
    @setSongPoint = true
    @skyColor = new THREE.Color()
    @frozen = false
    # CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)
    @controls.enabled = false
    # @controls.zoomSpeed = 0.5
    # @controls.rotateSpeed = 0.5

    @startSkyHue = 0.12
    @endSkyHue = -0.18
    @startSkyLight = 0.5
    @endSkyLight = 0.15

    @currentScene = FW.scene1
    @skyColor.setHSL @startSkyHue, 0.86, @startSkyLight
    FW.renderer.setClearColor @skyColor
    
    @skyLagFactor = 1.7

    FW.beatInterval = 3540
    
  update: ->
    if !@frozen
      #only update time if we are running the show!
      @currentScene?.update()
    else
      @controls.update()

    
  freeze : -> 
    @frozen = !@frozen
    @controls.enabled = !@controls.enabled
    @controls.target.z = FW.camera.position.z - 30    


  beginShow: (showStartTime)->
    #Inititalize Scenes
    FW.scene1 =
      startTime: showStartTime
      totalTime: @scene1TotalTime
      endTime: showStartTime + @scene1TotalTime
    scene2TotalTime = 66260
    # scene2TotalTime = 1000
    FW.scene2 = 
      startTime: FW.scene1.endTime
      songPoint: 154800
      endTime: FW.scene1.endTime + scene2TotalTime
      totalTime: scene2TotalTime
      camSpeed: 0.0
      camAcceleration: 0.000005

    scene3TotalTime = 33680
    FW.scene3 = 
      startTime: FW.scene2.endTime
      totalTime: scene3TotalTime
      endTime: FW.scene2.endTime + scene3TotalTime
      songPoint: 221760
      camAcceleration: .0001

    #endTime: songPoint + endTime
    #221760 + 255440
    FW.scene1.update = =>
      currentTime = Date.now()
      hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyHue, @endSkyHue )
      light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyLight, @endSkyLight )
      @skyColor.setHSL hue, 0.86, light
      FW.renderer.setClearColor @skyColor
      FW.mySun.update()  
      FW.myCamera.scene1Update()
      if currentTime > FW.scene1.endTime
        @initScene2()
    FW.scene2.update = =>
      currentTime = Date.now()
      FW.fireflies.tick()
      FW.myCamera.scene2Update()
      light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime,  @endSkyLight, 0 )
      @skyColor.setHSL @endSkyHue, 0.86, light
      FW.renderer.setClearColor @skyColor
      if currentTime > FW.scene2.endTime
        @initScene3()
    FW.scene3.update = =>
      FW.fireflies.tick()
      FW.myCamera.scene3Update()

    @currentScene = FW.scene1

  initScene2: ->
    #TRIGGER SONG JUMP HERE ************************
    if @setSongPoint == true
      FW.song.setPosition FW.scene2.songPoint
    @currentScene = FW.scene2
    FW.fireflies.runScene2()
    FW.scene.remove FW.mySun.sunMesh

  initScene3: ->
    # FW.song.setPosition FW.scene3.songPoint
    FW.camera.rotation.order = 'YXZ';
    FW.scene3.camRotStartX = FW.camera.rotation.x
    FW.scene3.camRotEndX = Math.PI/10
    FW.scene3.camSpeed = FW.scene2.camSpeed
    clearTimeout FW.scene2.fireflyInterval
    @currentScene = FW.scene3



