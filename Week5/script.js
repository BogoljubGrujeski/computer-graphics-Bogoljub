import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const geometry = new THREE.BufferGeometry();
const count = 100;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const light = new THREE.DirectionalLight({color:0xffff00,intensity:0.7})
scene.add(light);
const material = new THREE.MeshStandardMaterial({ color: 0xf00ff0, wireframe:true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const alight = new THREE.AmbientLight({color:0xffff00, intensity:0.7})
scene.add(alight);
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(2,2,5);
scene.add(camera);

const controls = new OrbitControls(camera, document.body);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const tick = () => {

    mesh.rotation.x +=0.01;
    mesh.rotation.y +=0.01;

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
