var light = null;
var sphere = null;

function loadScene() {
    if (engine) {
        engine.dispose();
    }

    engine = new BABYLON.Engine(canvas, true);
    engine.enableOfflineSupport = false;

    var rootUrl  = "";    
    var fileName = "scene.gltf";

    //set the following to false in order to hide the loading screen
    BABYLON.SceneLoader.ShowLoadingScreen = true;
    
    BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;    
    
    BABYLON.SceneLoader.Load(rootUrl, fileName, engine, function (scene) {
        
        scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 0.0);
                
        //scene.meshes is assumed to have exactly one element
        // for some reason BabylonJS has a "_root_" mesh too at position 0
        var mainMesh = scene.meshes[1]
            
        scene.environmentTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("images/environment.dds", scene);    
                
        mainMesh.material.cameraExposure          = 1.2;
        mainMesh.material.cameraContrast          = 1.5;
        mainMesh.material.backFaceCulling         = false;
        mainMesh.material.useObjectSpaceNormalMap = true;        
        
        var bbCenter   = mainMesh.getBoundingInfo().boundingBox.center;
        var bbSize     = mainMesh.getBoundingInfo().boundingBox.extendSize;            
        var sceneScale = bbSize.length();
                
        var scaleFactor = 3.46 / sceneScale;
                
        mainMesh.scaling = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor);
                
        // these values will be overridden anyway when we set the position
        var alpha  = 0;
        var beta   = 0;
        var radius = 3;
        
        camera = new BABYLON.ArcRotateCamera("camera", alpha, beta, radius, BABYLON.Vector3.Zero(), scene);
        
        var sceneCenter = bbCenter.multiplyByFloats(scaleFactor, scaleFactor, scaleFactor);
        
        var cameraInitPos = sceneCenter.add(new BABYLON.Vector3(0,0, 10));
        
        camera.setPosition(cameraInitPos);
        camera.setTarget(sceneCenter);
        
        camera.lowerRadiusLimit = 4;
        camera.upperRadiusLimit = 20;
                
        camera.wheelPrecision *= 10;
        camera.pinchPrecision *= 10;
        
        camera.attachControl(canvas, true);        

        engine.runRenderLoop(function () {
            scene.render();
        });
        
        //-----------------------------------------------------------
        // the other mesh using tangent-space normals, for comparison
        //-----------------------------------------------------------
        mainMesh.translate(BABYLON.Axis.X, -2.0, BABYLON.Space.WORLD);
        
        BABYLON.SceneLoader.Append(rootUrl + "tsn/", fileName, scene);
        scene.executeWhenReady(function() {            
            var otherMesh = scene.meshes[3];
            
            otherMesh.material.cameraExposure          = 1.2;
            otherMesh.material.cameraContrast          = 1.5;
            otherMesh.material.backFaceCulling         = false;         
            otherMesh.material.useObjectSpaceNormalMap = false;
            
            var bbCenter   = otherMesh.getBoundingInfo().boundingBox.center;
            var bbSize     = otherMesh.getBoundingInfo().boundingBox.extendSize;            
            var sceneScale = bbSize.length();
                    
            var scaleFactor = 3.46 / sceneScale;
                    
            otherMesh.scaling     = new BABYLON.Vector3(scaleFactor, scaleFactor, scaleFactor);
            otherMesh.translate(BABYLON.Axis.X, 2.0, BABYLON.Space.WORLD);
        });
        //-----------------------------------
    });
}
