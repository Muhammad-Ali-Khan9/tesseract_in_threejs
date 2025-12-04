import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

// Camera setup - top tilted view
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// Position camera for top tilted view - zoomed in
camera.position.set(5, 8, 5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0x00ffff, 0.8);
directionalLight1.position.set(5, 10, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xff00ff, 0.6);
directionalLight2.position.set(-5, -5, -5);
scene.add(directionalLight2);

// Tesseract vertices (4D coordinates projected to 3D)
// Outer cube (w = 1) and inner cube (w = -1)
const size = 2;
const vertices = [
    // Outer cube (w = 1)
    new THREE.Vector3(-size, -size, -size),  // 0
    new THREE.Vector3(size, -size, -size),   // 1
    new THREE.Vector3(size, size, -size),    // 2
    new THREE.Vector3(-size, size, -size),   // 3
    new THREE.Vector3(-size, -size, size),   // 4
    new THREE.Vector3(size, -size, size),    // 5
    new THREE.Vector3(size, size, size),     // 6
    new THREE.Vector3(-size, size, size),    // 7
    
    // Inner cube (w = -1, scaled down)
    new THREE.Vector3(-size * 0.5, -size * 0.5, -size * 0.5),  // 8
    new THREE.Vector3(size * 0.5, -size * 0.5, -size * 0.5),   // 9
    new THREE.Vector3(size * 0.5, size * 0.5, -size * 0.5),    // 10
    new THREE.Vector3(-size * 0.5, size * 0.5, -size * 0.5),   // 11
    new THREE.Vector3(-size * 0.5, -size * 0.5, size * 0.5),  // 12
    new THREE.Vector3(size * 0.5, -size * 0.5, size * 0.5),   // 13
    new THREE.Vector3(size * 0.5, size * 0.5, size * 0.5),    // 14
    new THREE.Vector3(-size * 0.5, size * 0.5, size * 0.5),   // 15
];

// Create groups for outer and inner cubes
const outerCubeGroup = new THREE.Group();
const innerCubeGroup = new THREE.Group();

// Materials for solid pillars
const edgeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ffff,
    metalness: 0.3,
    roughness: 0.4
});

const innerEdgeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff00ff,
    metalness: 0.3,
    roughness: 0.4
});

// Helper function to create a cylinder pillar between two points
function createPillar(start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position at midpoint
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mesh.position.copy(midpoint);
    
    // Orient cylinder to point from start to end
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(axis, direction.normalize());
    mesh.quaternion.copy(quaternion);
    
    return mesh;
}

// Pillar radius
const outerRadius = 0.08;
const innerRadius = 0.06;

// Outer cube edges (indices 0-7)
const outerEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // front face
    [4, 5], [5, 6], [6, 7], [7, 4], // back face
    [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
];

outerEdges.forEach(edge => {
    const pillar = createPillar(
        vertices[edge[0]],
        vertices[edge[1]],
        outerRadius,
        edgeMaterial
    );
    outerCubeGroup.add(pillar);
});

// Inner cube edges (indices 8-15)
const innerEdges = [
    [8, 9], [9, 10], [10, 11], [11, 8], // front face
    [12, 13], [13, 14], [14, 15], [15, 12], // back face
    [8, 12], [9, 13], [10, 14], [11, 15]  // connecting edges
];

innerEdges.forEach(edge => {
    const pillar = createPillar(
        vertices[edge[0]],
        vertices[edge[1]],
        innerRadius,
        innerEdgeMaterial
    );
    innerCubeGroup.add(pillar);
});

// Add cubes to scene
scene.add(outerCubeGroup);
scene.add(innerCubeGroup);

// Animation
let outerRotation = 0;
let innerRotation = 0;

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate outer cube clockwise (positive Y rotation)
    outerRotation += 0.005;
    outerCubeGroup.rotation.y = outerRotation;
    
    // Rotate inner cube counter-clockwise (negative Y rotation)
    innerRotation -= 0.005;
    innerCubeGroup.rotation.y = innerRotation;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

