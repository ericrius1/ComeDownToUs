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

    #SCENES
    startTime = Date.now()
    # totalTime = 154600
    totalTime = 3000
    FW.scene1 =
      startTime: startTime
      totalTime: totalTime
      endTime: startTime + totalTime
    FW.scene2 = 
      startTime: FW.scene1.endTime
      songPoint: 154700
      endTime: FW.scene1.endTime + 101000
      totalTime: 101000
      camSpeed: 0.2
      camAcceleration: 0.00012
      beatInterval: 3540
    #first beat: 154700
    #second beat: 158260

    @currentScene = FW.scene1
    
    @skyLagFactor = 1.7
    FW.scene1.update = =>
      @hue = map(@currentTime, FW.scene1.startTime, FW.scene1.endTime,  0.12, 0 )
      @light = map(@currentTime, FW.scene1.startTime, FW.scene1.endTime,  0.5, 0.2 )
      @skyColor.setHSL @hue, 0.86, @light
      FW.renderer.setClearColor @skyColor
      if FW.sunLight.position.y > FW.sunFinalHeight
        FW.mySun.update()  
      FW.myCamera.scene1Update()
      if @currentTime > FW.scene1.endTime
        @triggerScene2()
    FW.scene2.update = =>
      FW.fireflies.tick()
      FW.myCamera.scene2Update()
      light = map(@currentTime, FW.scene2.startTime, FW.scene2.endTime,  0.2, 0 )
      @skyColor.setHSL @hue, 0.86, light
      FW.renderer.setClearColor @skyColor

    @currentScene = FW.scene1


  update: ->
    @currentTime = Date.now()
    if !@frozen
      @currentScene.update()
    else
      @controls.update()

  triggerScene2: ->
    FW.song.setPosition FW.scene2.songPoint
    @currentScene = FW.scene2
    FW.fireflies.activate()
    FW.scene.remove FW.mySun.sunMesh

    
  freeze : -> 
    @frozen = !@frozen
    @controls.enabled = !@controls.enabled
    @controls.target.z = FW.camera.position.z - 30    






