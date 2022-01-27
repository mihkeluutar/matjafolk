//Variable for initModelSpin();
let scene, camera, renderer;

function initModelSpin() {

    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = -1;
    camera.position.z = 5; //How far the camera is from the object

    //Let's see if the lighting works :/
    light = new THREE.SpotLight(0xffa95c, 4);
    light.position.set(-50, 50, 50);
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;
    scene.add(light);

    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);

    //Helps with the axes of the animated object
    //scene.add(new THREE.AxesHelper(500));

    //Something to render the 3D model on webpage
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //Controls to change the rotation with mouse
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

    const loader = new THREE.GLTFLoader();
    loader.load('resources/models/cow/scene.gltf', function (gltf) {
        cow = gltf.scene.children[0];
        cow.scale.set(2, 2, 2);
        scene.add(gltf.scene);
        animate();
    });
};

//Animates the spinning animation
function animate() {
    requestAnimationFrame(animate);

    cow.rotation.x += 0.005;
    cow.rotation.y += 0.005;
    cow.rotation.z += 0.005;    

    renderer.render(scene, camera);
};

function countdownTimer(countDownDate) {

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = days + ":" + hours + ":"
            + minutes + ":" + seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "Tagasi huugama tütreke";
        }
    }, 1000);
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function changeBackground() {
    color = getRandomColor();
    document.body.style.background = color;
};