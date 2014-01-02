FW.Director = class Director
  constructor: ->

    @colorChangeTime = 50
    @skyColor = new THREE.Color()
    @frozen = false
    # CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)
    @controls.enabled = false
    @controls.zoomSpeed = 0.5
    @controls.rotateSpeed = 0.5

    @startSkyHue = 0.12
    @endSkyHue = -0.18
    @startSkyLight = 0.5
    @endSkyLight = 0.15

   

    @currentScene = FW.scene1
    @skyColor.setHSL @startSkyHue, 0.86, @startSkyLight
    FW.renderer.setClearColor @skyColor
    
    @skyLagFactor = 1.7
    
  update: ->
    if !@frozen
      #only update time if we are running the show!
      @currentScene?.update()
    else
      @controls.update()

  triggerScene2: ->
    FW.song.setPosition FW.scene2.songPoint
    @currentScene = FW.scene2
    FW.fireflies.awaken()
    FW.scene.remove FW.mySun.sunMesh

    
  freeze : -> 
    @frozen = !@frozen
    @controls.enabled = !@controls.enabled
    @controls.target.z = FW.camera.position.z - 30    


  beginShow: (showStartTime)->
    #Inititalize Scenes
    # scene1TotalTime = 155450
    scene1TotalTime = 2000
    FW.scene1 =
      startTime: showStartTime
      totalTime: scene1TotalTime
      endTime: showStartTime + scene1TotalTime
    #BEWARE of overwriting total time!!
    scene2TotalTime = 101000
    FW.scene2 = 
      startTime: FW.scene1.endTime
      songPoint: 154600
      endTime: FW.scene1.endTime + scene2TotalTime
      totalTime: scene2TotalTime
      camSpeed: 0.0
      camAcceleration: 0.00018
      beatInterval: 3540
    #first beat: 154700
    #second beat: 158260

    FW.scene1.update = =>
      currentTime = Date.now()
      hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyHue, @endSkyHue )
      light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime,  @startSkyLight, @endSkyLight )
      @skyColor.setHSL hue, 0.86, light
      FW.renderer.setClearColor @skyColor
      if FW.sunLight.position.y > FW.sunFinalHeight
        FW.mySun.update()  
      FW.myCamera.scene1Update()
      if currentTime > FW.scene1.endTime
        @triggerScene2()
    FW.scene2.update = =>
      currentTime = Date.now()
      FW.fireflies.tick()
      FW.myCamera.scene2Update()
      light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime,  @endSkyLight, 0 )
      @skyColor.setHSL @endSkyHue, 0.86, light
      FW.renderer.setClearColor @skyColor

    @currentScene = FW.scene1



