

FW.Sun = class Sun
  constructor: ()->


    @sunColor = new THREE.Color()
    @startHue = 0.08
    @endHue = 0.00
    @startLight = 0.6
    @endLight = 0.35

    @startIntensity = 4
    @endIntensity = 1

    @startScale = 300
    @endScale = 700
    
    @startHeight = 1200
    @endHeight = -613

    @startX = -500
    @endX = 200
    #LIGHT
    @sunLight = new THREE.DirectionalLight(0xffffff, @startingIntensity, 10000)
    @sunLight.position = new THREE.Vector3 0, @startHeight, FW.width
    FW.scene.add @sunLight

    @sunGeo = new THREE.SphereGeometry(1, 100, 100)
    @material = new THREE.MeshBasicMaterial()
    @sunMesh = new THREE.Mesh @sunGeo, @material
    @sunMesh.position = new THREE.Vector3 @startX, @startHeight, -FW.width
    @sunMesh.scale.set @startScale, @startScale, @startScale
    FW.scene.add @sunMesh

    @sunColor.setHSL @startHue, 0.86, @startLight
    @sunMesh.material.color = @sunColor
    @sunLight.color = @sunColor
    @sunLight.intensity = @startIntensity




  update : ->
    currentTime = Date.now()
    yPos =  map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startHeight, @endHeight
    @sunMesh.position.y = yPos
    @sunLight.position.y = yPos

    @sunMesh.position.x = map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startX, @endX
    
    scale = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, @startScale, @endScale)
    @sunMesh.scale.set scale, scale, scale

    @sunLight.intensity = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, @startIntensity, @endIntensity)

    hue = map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startHue, @endHue
    light = map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startLight, @endLight
    @sunColor.setHSL hue, 0.9, light







