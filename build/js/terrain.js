(function() {
  var Terrain;

  FW.Terrain = Terrain = (function() {
    function Terrain() {
      var cavern, cavernGeo, cavernParams, leftMountain, mountainGeo, mountainParams, rightMountain, terrainMaterial;
      this.rotation = Math.PI * .45;
      FW.terrainLength = FW.width * 0.2;
      mountainParams = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: FW.terrainLength,
        height: FW.width,
        widthSegments: 200,
        heightSegments: 200,
        depth: 1100,
        param: 4,
        filterparam: 1,
        filter: [CIRCLE_FILTER],
        postgen: [MOUNTAINS_COLORS],
        effect: [DESTRUCTURE_EFFECT]
      };
      cavernParams = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: 250,
        height: 350,
        widthSegments: 10,
        heightSegments: 10,
        depth: 150,
        param: 4,
        filterparam: 1,
        filter: [CIRCLE_FILTER],
        postgen: [MOUNTAINS_COLORS],
        effect: [DESTRUCTURE_EFFECT]
      };
      mountainGeo = TERRAINGEN.Get(mountainParams);
      terrainMaterial = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
      });
      leftMountain = new THREE.Mesh(mountainGeo, terrainMaterial);
      leftMountain.position = new THREE.Vector3(-FW.width * 0.5, -100, -FW.width * .25);
      leftMountain.rotation.y -= this.rotation;
      FW.scene.add(leftMountain);
      rightMountain = new THREE.Mesh(mountainGeo, terrainMaterial);
      rightMountain.position = new THREE.Vector3(FW.width * 0.5, -100, -FW.width * 0.25);
      rightMountain.rotation.y += this.rotation;
      FW.scene.add(rightMountain);
      cavernGeo = TERRAINGEN.Get(cavernParams);
      cavern = new THREE.Mesh(cavernGeo, terrainMaterial);
      cavern.position.set(0, -0, 500);
      FW.scene.add(cavern);
    }

    return Terrain;

  })();

}).call(this);
