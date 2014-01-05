FW.Terrain = class Terrain
  constructor: ->
    @rotation = Math.PI * .45
    FW.terrainLength = FW.width * 0.2
    mountainParams = 
      alea: RAND_MT,
      generator: PN_GENERATOR,
      width: FW.terrainLength
      height: FW.width
      widthSegments: 250
      heightSegments: 250
      depth: 900
      param: 4,
      filterparam: 1
      filter: [ CIRCLE_FILTER ]
      postgen: [ MOUNTAINS_COLORS ]
      effect: [ DESTRUCTURE_EFFECT ]

    mountainGeo = TERRAINGEN.Get(mountainParams)
    terrainMaterial = new THREE.MeshPhongMaterial vertexColors: THREE.VertexColors, shading: THREE.FlatShading, side: THREE.DoubleSide 
    
    leftMountain = new THREE.Mesh mountainGeo, terrainMaterial
    leftMountain.position = new THREE.Vector3 -FW.width * 0.5, -100, -FW.width * .25  
    leftMountain.rotation.y -= @rotation
    FW.scene.add leftMountain

    rightMountain = new THREE.Mesh mountainGeo, terrainMaterial
    rightMountain.position = new THREE.Vector3 FW.width * 0.5, -100, -FW.width * 0.25
    rightMountain.rotation.y += @rotation
    FW.scene.add rightMountain
    @createBridge()


  createBridge: ->
    numPillarPairs = 10
    
    startPairPosZ = FW.scene2.startZ - 200
    endPairPosZ = FW.scene3.startZ - 100

    pillarScale = 2
    startHeightScale = 0
    endHeightScale = 100

    pillarGeo = new THREE.CylinderGeometry(1, 1)
    pillarMat = new THREE.MeshPhongMaterial
      shading: THREE.FlatShading 
      side: THREE.DoubleSide
      specular: new THREE.Color()
      shininess: 20
    FW.pillarPairDistance = 400


    for pillarPairIndex in [1..numPillarPairs]
      pillar1 = new THREE.Mesh pillarGeo, pillarMat
      zPillarPos = map(pillarPairIndex, 1, numPillarPairs, startPairPosZ, endPairPosZ )
      pillar1.position.set -FW.pillarPairDistance/2, 0, zPillarPos

      #If we're in first half of bridge, then scale up, otherwise scale down
      if pillarPairIndex < numPillarPairs/2
        heightScale = map(pillarPairIndex, 1, numPillarPairs, startHeightScale, endHeightScale)
      else 
        heightScale = map(pillarPairIndex, 1, numPillarPairs, endHeightScale, startHeightScale)


      pillar1.scale.set pillarScale, heightScale, pillarScale


      FW.scene.add pillar1

      pillar2 = pillar1.clone()
      pillar2.position.set FW.pillarPairDistance/2, 0, zPillarPos
      FW.scene.add pillar2


    