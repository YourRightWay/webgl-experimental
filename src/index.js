function Application(options) {
    this.options = options || {};

    this.initEvents = function () {
        let _ = this;
        document.addEventListener('mousemove', function (e) {
            console.log(e.clientX/100000)
            console.log(e.clientY/100000)
            _.sphere.rotation.y += e.clientY / 100000;
            _.sphere.rotation.x += e.clientX / 100000;
        }, false);
    }

    this.init = function () {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(this.options.fov, this.options.ratio, this.options.near, this.options.far);
        this.camera.position.z = 5;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.sphereGeometry = new THREE.SphereGeometry( this.options.radius, this.options.widthSegments, this.options.heightSegments );
        this.sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x2980b9, wireframe: true });

        this.sphere = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial );
        this.scene.add( this.sphere );


        this.initEvents();
    }

    this.animate = function () {

        requestAnimationFrame(() => {
            this.animate();
        });

        //this.sphere.rotation.y += 0.005;
        //this.sphere.rotation.x += 0.0001;
        this.sphere.scale.z += 0.004;

        this.renderer.render( this.scene, this.camera );
    }
}

let app = new Application({
    fov: 75,
    ratio: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    radius: 2,
    widthSegments: 100,
    heightSegments: 100
});
app.init();
app.animate();

