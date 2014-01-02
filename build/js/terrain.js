(function() {
  var Terrain;

  FW.Terrain = Terrain = (function() {
    function Terrain() {
      var parameters, terrain, terrainGeo, terrainMaterial;
      FW.terrainLength = FW.width * 0.5;
      FW.terrainPosition = new THREE.Vector3(FW.width * 0.2, -100, -FW.terrainLength * 0.5);
      parameters = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: FW.width,
        height: FW.terrainLength,
        widthSegments: 150,
        heightSegments: 150,
        depth: 1100,
        param: 4,
        filterparam: 1,
        filter: [CIRCLE_FILTER],
        postgen: [MOUNTAINS_COLORS],
        effect: [DESTRUCTURE_EFFECT]
      };
      terrainGeo = TERRAINGEN.Get(parameters);
      terrainMaterial = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
      });
      terrain = new THREE.Mesh(terrainGeo, terrainMaterial);
      terrain.position = FW.terrainPosition;
      FW.scene.add(terrain);
    }

    return Terrain;

  })();

}).call(this);
