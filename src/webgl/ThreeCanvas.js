import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class ThreeCanvas {
    constructor(options) {
        const { mountPoint, width, height } = options;

        const clock = this.clock = new THREE.Clock();
        const scene = this.scene = new THREE.Scene();
        const camera = this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 2;

        const renderer = this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(width, height);

        mountPoint.appendChild(renderer.domElement);

        const controls = this.controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        this.addMeshes(scene);
        this.addLights(scene);
    }

    addMeshes(scene) {
        const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
        const material = new THREE.MeshBasicMaterial();
        material.color = new THREE.Color(0xff0000);

        const sphere = this.sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    }

    addLights(scene) {
        const pointLight = new THREE.PointLight(0xffffff, 0.1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;

        scene.add(pointLight);
    }

    resizeRendererToDisplaySize(width, height) {
        const canvas = this.renderer.domElement;  
        const needResize = canvas.width !== width || canvas.height !== height;
    
        if (needResize) {
            this.renderer.setSize(width, height, false);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // use 2x pixel ratio at max
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        console.log(`${width} x ${canvas.width}`)
    }
    
    setAnimationLoop(callback) {
        this.renderer.setAnimationLoop(callback);
    }
    
    render() {
        this.sphere.rotation.y = .5 * this.clock.getElapsedTime();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

}

export default ThreeCanvas;
