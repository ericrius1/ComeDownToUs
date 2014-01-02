

FW.Sun = class Sun
  constructor: ()->

    # FW.sunsetSpeed = 2
    @startHue = 0.08
    @startLight = 0.6
    FW.sunsetSpeed = 0.22
    FW.sunStartingHeight = 1200
    FW.sunFinalHeight = -FW.sunStartingHeight
    @initialScale = 380
    @maxScale = 800
    @sunColor = new THREE.Color()
    @scaleFactor = 0.001
    FW.endMapNum = FW.sunFinalHeight/2

    @startingIntensity = 18
    @endIntensity = 9
    @startHue = 0.08
    @endHue = 0.00
    @startLight = 0.6
    @endLight = 0.35


    
    #LIGHT
    FW.sunLight = new THREE.SpotLight(0xffffff, @startingIntensity, FW.width * 10)
    FW.sunLight.position = new THREE.Vector3 FW.width * 0.7 , FW.sunStartingHeight, -FW.width * 0.1 
    FW.scene.add FW.sunLight

    @sunGeo = new THREE.SphereGeometry(1, 100, 100)
    @material = new THREE.MeshBasicMaterial()
    @sunMesh = new THREE.Mesh @sunGeo, @material
    @sunMesh.position = FW.sunLight.position
    @sunMesh.scale.set @initialScale, @initialScale, @initialScale
    FW.scene.add @sunMesh

    @sunColor.setHSL @startHue, 0.86, @startLight
    @sunMesh.material.color = @sunColor
    FW.sunLight.color = @sunColor


  update : ->
    FW.sunLight.position.y -= FW.sunsetSpeed
    sunPosY = FW.sunLight.position.y
    FW.sunLight.intensity = map(sunPosY, FW.sunStartingHeight, FW.endMapNum,  @startingIntensity, @endIntensity)
    hue = map(sunPosY, FW.sunStartingHeight, FW.endMapNum * 0.01,  @startHue, @endHue )
    light = map(sunPosY, FW.sunStartingHeight, FW.endMapNum, @startLight, @endLight )
    @sunColor.setHSL hue, 0.9, light
    @sunMesh.material.color = @sunColor
    FW.sunLight.color = @sunColor
    FW.sunLight.position.z += FW.sunsetSpeed
    if @sunMesh.scale.y < @maxScale
     scale =  @sunMesh.scale.multiplyScalar 1 + FW.sunsetSpeed * @scaleFactor
     @sunMesh.scale =  scale




