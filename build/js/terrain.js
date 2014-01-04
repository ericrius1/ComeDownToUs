(function() {
  var Terrain;

  FW.Terrain = Terrain = (function() {
    function Terrain() {
      var parameters, terrain1, terrain2, terrainGeo, terrainMaterial;
      this.rotation = Math.PI * .45;
      FW.terrainLength = FW.width * 0.2;
      parameters = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: FW.terrainLength,
        height: FW.width,
        widthSegments: 250,
        heightSegments: 250,
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
      terrain1 = new THREE.Mesh(terrainGeo, terrainMaterial);
      terrain1.position = new THREE.Vector3(-FW.width * 0.5, -100, -FW.width * .25);
      terrain1.rotation.y -= this.rotation;
      FW.scene.add(terrain1);
      terrain2 = new THREE.Mesh(terrainGeo, terrainMaterial);
      terrain2.position = new THREE.Vector3(FW.width * 0.5, -100, -FW.width * 0.25);
      terrain2.rotation.y += this.rotation;
      FW.scene.add(terrain2);
    }

    return Terrain;

  })();

}).call(this);
