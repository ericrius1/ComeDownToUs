FW.Director = class Director
  constructor: ->
    # @timeTillSceneChange = 155000
    @timeTillSceneChange = 2000
    @colorChangeTime = 50
    @skyColor = new THREE.Color()
    @frozen = false
    # CONTROLS
    @controls = new THREE.OrbitControls(FW.camera)
    @controls.enabled = false
    @controls.zoomSpeed = 0.5
    @controls.rotateSpeed = 0.5

    #SCENE2

    FW.scene2 = 
      totalTime: 100000
      camSpeed: 0.1
      camAcceleration: 0.02


    

    @skyLagFactor = 1.7
    @currentScene = 1
    setTimeout(()=>
      @changeScene()
    @timeTillSceneChange)

  update: ->
    if !@frozen
      if @currentScene is 1
          @updateScene1()
        else 
          @updateScene2()
    else
      @controls.update()

  updateScene1: ->
    @hue = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum,  0.12, 0 )
    @light = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum * @skyLagFactor,  0.5, 0.2 )
    @skyColor.setHSL @hue, 0.86, @light
    FW.renderer.setClearColor @skyColor
    if FW.sunLight.position.y > FW.sunFinalHeight
      FW.mySun.update()  
    FW.myCamera.scene1Update()


  updateScene2: ->
    currentTime = Date.now()
    FW.fireflies.tick()
    FW.myCamera.scene2Update()
    light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime,  0.2, 0 )
    @skyColor.setHSL @hue, 0.86, light
    FW.renderer.setClearColor @skyColor


  changeScene: ->
    FW.scene2.startTime = Date.now()
    FW.scene2.endTime = FW.scene2.startTime + FW.scene2.totalTime
    FW.scene2.startingCamPosX = FW.camera.positionX
    FW.scene2.endingCamPosX = FW.width/2
    @currentScene++
    FW.fireflies.activate()
    FW.scene.remove FW.mySun.sunMesh

    
  freeze : -> 
    @frozen = !@frozen
    @controls.enabled = !@controls.enabled
    @controls.target.z = FW.camera.position.z - 30    






