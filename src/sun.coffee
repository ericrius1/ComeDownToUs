

FW.Sun = class Sun
  constructor: ()->

    @sunColor = new THREE.Color()
    @startHue = 0.08
    @endHue = 0.00
    @startLight = 0.6
    @endLight = 0.35

    @scene1StartIntensity = 4
    @scene1EndIntensity = 1
    @scene2StartIntensity = @scene1EndIntensity
    @scene2EndIntensity = .5



    @startScale = 300
    @endScale = 700
    
    @startHeight = 1200
    @endHeight = -@endScale - 10

    @startX = -500
    @endX = 300
    #LIGHT
    @sunLight = new THREE.DirectionalLight(0xffffff, @startingIntensity, FW.height * 2)
    @sunLight.position = new THREE.Vector3 0, @startHeight, FW.height/2
    FW.scene.add @sunLight

    @sunGeo = new THREE.SphereGeometry(1, 100, 100)
    @material = new THREE.MeshBasicMaterial()
    @sunMesh = new THREE.Mesh @sunGeo, @material
    @sunMesh.position = new THREE.Vector3 @startX, @startHeight, -FW.height/2
    @sunMesh.scale.set @startScale, @startScale, @startScale
    FW.scene.add @sunMesh

    @sunColor.setHSL @startHue, 0.86, @startLight
    @sunMesh.material.color = @sunColor
    @sunLight.color = @sunColor
    @sunLight.intensity = @scene1StartIntensity




  scene1Update : ->
    currentTime = Date.now()
    yPos =  map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startHeight, @endHeight
    @sunMesh.position.y = yPos
    @sunLight.position.y = yPos

    @sunMesh.position.x = map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startX, @endX
    
    scale = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, @startScale, @endScale)
    @sunMesh.scale.set scale, scale, scale

    @sunLight.intensity = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, @scene1StartIntensity, @scene1EndIntensity)

    hue = map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startHue, @endHue
    light = map currentTime, FW.scene1.startTime, FW.scene1.endTime, @startLight, @endLight
    @sunColor.setHSL hue, 0.9, light

  scene2Update: ->
    currentTime = Date.now()
    @sunLight.intensity = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, @scene2StartIntensity, @scene2EndIntensity)







