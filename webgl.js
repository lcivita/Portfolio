import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const plane_geometry = new THREE.PlaneGeometry();
const plane_material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1 },
        resolution: { value: new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio) },
        mouse: { value: new THREE.Vector2() }, // Mouse position uniform
    },
    fragmentShader: document.getElementById('fragmentShader').textContent,
});
const plane_mesh = new THREE.Mesh(plane_geometry, plane_material);
plane_mesh.scale.set(window.innerWidth / window.innerHeight, 1, 1);
scene.add(plane_mesh);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(0, 0, 1);
scene.add(camera);

// Event listener to capture normalized mouse position
const mouse = new THREE.Vector2();
document.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to range [0, 1]
    mouse.x = event.clientX / window.innerWidth;
    mouse.y = event.clientY / window.innerHeight;

    // Update the mouse uniform
    plane_material.uniforms.mouse.value.copy(mouse);
});

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
    plane_mesh.scale.set(window.innerWidth / window.innerHeight, 1, 1);
    plane_material.uniforms.resolution.value = new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
};

const start = Date.now() / 1000;
function animate() {
    requestAnimationFrame(animate);
    plane_material.uniforms.time.value = (Date.now() / 1000) - start;
    renderer.render(scene, camera);
}
animate();
