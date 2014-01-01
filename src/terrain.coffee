FW.Terrain = class Terrain
  constructor: ->
    FW.terrainLength = FW.width * 0.5
    FW.terrainPosition =  new THREE.Vector3 FW.width * 0.2, -700, -FW.terrainLength * 0.5
    parameters = 
      alea: RAND_MT,
      generator: PN_GENERATOR,
      width: FW.width
      height: FW.terrainLength
      widthSegments: 100
      heightSegments: 100
      depth: FW.width * 0.1
      param: 4,
      filterparam: 1
      filter: [ CIRCLE_FILTER ]
      postgen: [ MOUNTAINS_COLORS ]
      effect: [ DESTRUCTURE_EFFECT ]

    terrainGeo = TERRAINGEN.Get(parameters)
    terrainMaterial = new THREE.MeshPhongMaterial vertexColors: THREE.VertexColors, shading: THREE.FlatShading, side: THREE.DoubleSide 
    terrain = new THREE.Mesh terrainGeo, terrainMaterial
    terrain.position = FW.terrainPosition
    terrain.position.y= - 550
    FW.scene.add terrain
