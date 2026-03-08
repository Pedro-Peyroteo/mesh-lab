/**
 * Main Application Entry Point
 *
 * Initializes the Three.js scene with a basic wireframe mesh.
 * Sets up the rendering pipeline and animation loop.
 */

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createCamera } from "./rendering/camera";
import { createRenderer } from "./rendering/renderer";
import { createScene } from "./rendering/scene";
import { createGridMesh } from "./geometry/mesh";

// ============================================================================
// Scene Initialization
// ============================================================================

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

// Attach the WebGL canvas to the DOM
document.body.appendChild(renderer.domElement);

// ============================================================================
// Controls Setup
// ============================================================================

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05; // Damping inertia

// ============================================================================
// Scene Content
// ============================================================================

// Create and add the wireframe mesh to the scene
const mesh = createGridMesh(10, 20);
scene.add(mesh);

deformMesh(mesh);

// ============================================================================
// Window Resize Handler
// ============================================================================

window.addEventListener("resize", () => {
  // Update camera aspect ratio to match new window dimensions
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Resize renderer to fill the window
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function deformMesh(mesh) {
  const positions = mesh.geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const z = positions[i + 2];

    const height = Math.sin(x * 2) * Math.cos(z * 2);

    positions[i + 1] = height;
  }

  mesh.geometry.attributes.position.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
}

// ============================================================================
// Animation Loop
// ============================================================================

/**
 * Main animation loop - called every frame
 * Handles control updates and rendering
 */
function animate() {
  controls.update(); // Update camera controls with damping
  renderer.render(scene, camera); // Render the scene from camera's perspective
  requestAnimationFrame(animate); // Schedule next frame
}

// Start the animation loop
animate();
