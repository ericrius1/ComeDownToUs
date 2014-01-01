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
    hue = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum,  0.12, 0 )
    light = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum * @skyLagFactor,  0.5, 0.1 )
    @skyColor.setHSL hue, 0.86, light
    FW.renderer.setClearColor @skyColor
    if FW.sunLight.position.y > FW.sunFinalHeight
      FW.mySun.update()
      
    if FW.camera.position.z > FW.terrainPosition.z
      FW.myCamera.update()


  updateScene2: ->
    FW.fireflies.tick()


  changeScene: ->
    @currentScene++
    FW.fireflies.activate()
    # FW.scene.remove FW.sunLight
    FW.scene.remove FW.mySun.sunMesh

    
  freeze : -> 
    @frozen = !@frozen
    @controls.enabled = !@controls.enabled
    @controls.target.z = FW.camera.position.z - 30    





