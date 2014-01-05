
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    FW.SCREEN_WIDTH = window.innerWidth
    FW.SCREEN_HEIGHT = window.innerHeight
    @rippleFactor = 120

    # CAMERA
    FW.myCamera = new FW.Camera()

    #CONTROLS
    FW.controls = new THREE.OrbitControls(FW.camera)
    FW.controls.enabled = false

    # SCENE 
    FW.scene = new THREE.Scene()

    # RENDERER
    FW.renderer = new THREE.WebGLRenderer(antialias: true)
    FW.renderer.setSize FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT
    document.body.appendChild FW.renderer.domElement
    color = new THREE.Color().setHSL .12, .86, .5
    FW.renderer.setClearColor  color
    
    #TERRAIN
    @terrain = new FW.Terrain()
    
    #SUN
    FW.mySun = new FW.Sun()

    #FIREFLIES
    FW.fireflies = new FW.Fireflies()

    #WORMHOLE
    FW.wormHole = new FW.WormHole()

    #LIGHT
    FW.moonLight = new THREE.DirectionalLight 0xffffff, 0.2
    FW.scene.add FW.moonLight

    #WATER
    @loadWater()

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false
  
  onWindowResize : (event) ->
    FW.SCREEN_WIDTH = window.innerWidth
    FW.SCREEN_HEIGHT = window.innerHeight
    FW.renderer.setSize FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT
    FW.myCamera.resize()

  render : ->
    time = Date.now()
    @water.material.uniforms.time.value += 1.0 / @rippleFactor
    @water.render()
    FW.renderer.render( FW.scene, FW.camera );

  loadWater:   ->
    waterNormals = new THREE.ImageUtils.loadTexture 'assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.renderer, FW.camera, FW.scene,
      textureWidth: 512
      textureHeight: 512
      waterNormals: waterNormals
      alpha: 1.0
      distortionScale: 20

    aMeshMirror = new THREE.Mesh(
      new THREE.PlaneGeometry FW.width, FW.height, 50, 50
      @water.material
    )
    aMeshMirror.add @water
    aMeshMirror.rotation.x = -Math.PI * 0.5
    FW.scene.add aMeshMirror    
