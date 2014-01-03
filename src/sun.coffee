

FW.Sun = class Sun
  constructor: ()->


    @startHue = 0.08
    @startLight = 0.6
    FW.sunStartingHeight = 1200
    @initialScale = 380
    @sunColor = new THREE.Color()

    @startingIntensity = 7
    @endIntensity = 2
    @startHue = 0.08
    @endHue = 0.00
    @startLight = 0.6
    @endLight = 0.35

    @startScale = 300
    @endScale = 600
    
    #LIGHT
    FW.sunLight = new THREE.PointLight(0xffffff, @startingIntensity, 10000)
    FW.sunLight.position = new THREE.Vector3 0, FW.sunStartingHeight, FW.width
    FW.scene.add FW.sunLight

    @sunGeo = new THREE.SphereGeometry(1, 100, 100)
    @material = new THREE.MeshBasicMaterial()
    @sunMesh = new THREE.Mesh @sunGeo, @material
    @sunMesh.position = new THREE.Vector3 0, FW.sunStartingHeight, -FW.width
    @sunMesh.scale.set @initialScale, @initialScale, @initialScale
    FW.scene.add @sunMesh

    @sunColor.setHSL @startHue, 0.86, @startLight
    @sunMesh.material.color = @sunColor
    FW.sunLight.color = @sunColor


  update : ->
    currentTime = Date.now()
    FW.sunLight.position.y -= FW.sunsetSpeed
    @sunMesh.position.y -=FW.sunsetSpeed
    sunPosY = FW.sunLight.position.y
    scale = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, @startScale, @endScale)
    @sunMesh.scale.set scale, scale, scale






