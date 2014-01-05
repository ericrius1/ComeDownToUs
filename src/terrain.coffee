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
    @createCoils()  


  createCoils: ->
    numCoils = 3
    startPairPosZ = FW.scene2.startZ - 500
    endPairPosZ = FW.scene2.endZ

    coilGeo = new THREE.IcosahedronGeometry(1, 2)
    coilMat = new THREE.MeshPhongMaterial
      shading: THREE.FlatShading 
      side: THREE.DoubleSide
      specular: new THREE.Color()
      shininess: 20
    coilScale = 50
    FW.coilPairDistance = 400



    for coilNum in [1..numCoils]
      zCoilPos = map(coilNum, 1, numCoils, startPairPosZ, endPairPosZ )
      
      coil1 = new THREE.Mesh coilGeo, coilMat
      coil1.position.set -FW.coilPairDistance/2, coilScale, zCoilPos
      coil1.scale.set coilScale/10, coilScale*4, coilScale/10
      FW.scene.add coil1

      coil2 = coil1.clone()
      coil2.position.set FW.coilPairDistance/2, coilScale, zCoilPos
      FW.scene.add coil2

    