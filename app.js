 var sample_size = 200;
 var frequencyData = new Uint8Array(sample_size);

//-----------------------------------------------------------------------

$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
 // var frequencyData = new Uint8Array(200);

  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {


     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);
  
    }

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(0, 150, ' + d + ')';
        });

  // Run the loop
  renderChart();

});


    var scene, camera, renderer;
    var geometry, material, mesh;
    var num_spheres = 20;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera =  new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 10, 10000);
        camera.position.z = 1000;
        camera.position.y = 300;
        camera.lookAt (new THREE.Vector3( 0, 0, 0 ));


        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth * 0.75, window.innerHeight * 0.75);
        document.body.appendChild( renderer.domElement );

        var increment = 65;
        var start_x = -1 * increment * num_spheres * 0.5;
        for(var i = 0; i < num_spheres; ++i)
        {
            // sphere geometry
            var sphere_radius = 20;
            var segments = 100;
            var rings = 100;
        
            // create the sphere's material
            var sphereMaterial =
            new THREE.MeshLambertMaterial(
            {
                color: 0x00B6FF
            });
            var sphere_geometry = new THREE.SphereGeometry(sphere_radius, segments,rings);

            // generate sphere
            var sphere = new THREE.Mesh(sphere_geometry,sphereMaterial);

            // name sphere
            sphere.name = "sphere" + i;

            // set casts shadows to true
            sphere.castShadow = true;
            sphere.receiveShadow = true;

            // set position
            var position = start_x + (increment * i);
            sphere.position.set(position, 0, 0);

            // add the sphere to the scene
            scene.add(sphere);

        }

        // create a point light
        var pointLight =
        new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 100;
        pointLight.position.z = 100;
        pointLight.distance = 2000;

        // add to the scene
        //scene.add(pointLight);

        // create a spot light
        var spot_light = new THREE.SpotLight( 0xffffff );
        spot_light.position.set(0, 1000, 100);
        spot_light.castShadow = true;
        spot_light.shadowMapWidth = 1024;
        spot_light.shadowMapHeight = 1024;
        spot_light.shadowCameraNear = 10;
        spot_light.shadowCameraFar = 10000;
        spot_light.shadowCameraFov = 30;
        scene.add(spot_light);

        // create ambient light
        var ambient_light = new THREE.AmbientLight( 0x444444 ); // soft white light
        scene.add( ambient_light );

        // draw!
        renderer.render(scene, camera);

        // create floor
        var floor_material = new THREE.MeshLambertMaterial(
        {
            color: 0xf4f4f4
        });

    }


    function animate() {

        for(var i = 0; i < num_spheres; ++i)
        {

            var name = "sphere" + i;
            var sphere_ = scene.getObjectByName(name);

            var span = (sample_size / num_spheres);
            var start_index = span * i;
            var end_index = start_index + span;
            var amp_sum = 0;

            for(var j = start_index; j < end_index; ++ j)
            {
                var amplitude = frequencyData[j];
                amp_sum += amplitude;

            }
            var avg_amplitude = amp_sum / span;
            sphere_.position.set(sphere_.position.x, avg_amplitude, sphere_.position.y);
            //sphere_.material.color.setRGB(150.0, avg_amplitude / 100.0, 0.0);

        }
        requestAnimationFrame( animate );
        renderer.render( scene, camera );

    }

