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
    totalTime = 1000
    FW.scene1 =
      startTime: startTime
      totalTime: totalTime
      endTime: startTime + totalTime
    FW.scene2 = 
      startTime: FW.scene1.endTime
      endTime: FW.scene1.endTime + 101000
      totalTime: 101000
      camSpeed: 0.2
      camAcceleration: 0.00012
      beatInterval: 3558
    
    @skyLagFactor = 1.7
    @currentScene = 1
    setTimeout(()=>
      @changeScene()
    FW.scene1.totalTime)

  update: ->
    @currentTime = Date.now()
    if !@frozen
      if @currentScene is 1
          @updateScene1()
        else 
          @updateScene2()
    else
      @controls.update()

  updateScene1: ->
    @hue = map(@currentTime, FW.scene1.startTime, FW.scene1.endTime,  0.12, 0 )
    @light = map(@currentTime, FW.scene1.startTime, FW.scene1.endTime,  0.5, 0.2 )
    @skyColor.setHSL @hue, 0.86, @light
    FW.renderer.setClearColor @skyColor
    if FW.sunLight.position.y > FW.sunFinalHeight
      FW.mySun.update()  
    FW.myCamera.scene1Update()


  updateScene2: ->
    FW.fireflies.tick()
    FW.myCamera.scene2Update()
    light = map(@currentTime, FW.scene2.startTime, FW.scene2.endTime,  0.2, 0 )
    @skyColor.setHSL @hue, 0.86, light
    FW.renderer.setClearColor @skyColor


  changeScene: ->
    FW.scene2.startingCamPosX = FW.camera.positionX
    FW.scene2.endingCamPosX = FW.width/2
    @currentScene++
    FW.fireflies.activate()
    FW.scene.remove FW.mySun.sunMesh

    
  freeze : -> 
    @frozen = !@frozen
    @controls.enabled = !@controls.enabled
    @controls.target.z = FW.camera.position.z - 30    






