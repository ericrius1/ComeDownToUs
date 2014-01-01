

FW.Sun = class Sun
  constructor: ()->

    FW.sunsetSpeed = 300
    # FW.sunsetSpeed = 2
    FW.sunStartingHeight = 12000
    FW.sunFinalHeight = -FW.sunStartingHeight
    @initialScale = 2400
    @startingIntensity = 20
    @endIntensity = 5
    @maxScale = 7000
    @sunColor = new THREE.Color()
    @scaleFactor = 0.0001
    FW.endMapNum = FW.sunFinalHeight/2

    
    #LIGHT
    FW.sunLight = new THREE.SpotLight(0xff0000, @startingIntensity, FW.width * 10)
    FW.sunLight.position = new THREE.Vector3 FW.width * 0.7 , FW.sunStartingHeight, -FW.width * 0.1 
    FW.scene.add FW.sunLight

    @sunGeo = new THREE.SphereGeometry(1, 100, 100)
    @material = new THREE.MeshBasicMaterial()
    @sunMesh = new THREE.Mesh @sunGeo, @material
    @sunMesh.position = FW.sunLight.position
    @sunMesh.scale.set @initialScale, @initialScale, @initialScale
    FW.scene.add @sunMesh


  update : ->
    # FW.sunsetSpeed += FW.sunsetAccel
    FW.sunLight.position.y -= FW.sunsetSpeed
    sunPosY = FW.sunLight.position.y
    FW.sunLight.intensity = map(sunPosY, FW.sunStartingHeight, FW.endMapNum,  @startingIntensity, @endIntensity)
    hue = map(sunPosY, FW.sunStartingHeight, FW.endMapNum * 0.01,  0.08, .001 )
    light = map(sunPosY, FW.sunStartingHeight, FW.endMapNum,  0.6, 0.3 )
    @sunColor.setHSL hue, 0.86, light
    @sunMesh.material.color = @sunColor
    FW.sunLight.color = @sunColor
    if FW.sunLight.position.y > 0
      FW.sunLight.position.z += FW.sunsetSpeed * 1.2
    if @sunMesh.scale.y < @maxScale
     scale =  @sunMesh.scale.multiplyScalar 1 + FW.sunsetSpeed * @scaleFactor
     @sunMesh.scale =  scale




