/**
 * Camera Configuration Module
 *
 * Handles perspective camera setup for the 3D scene.
 */

import * as THREE from "three";

/**
 * Creates and configures a perspective camera
 *
 * Camera parameters:
 * - FOV: 70 degrees (vertical field of view)
 * - Aspect: Matches window dimensions
 * - Near plane: 0.1 units
 * - Far plane: 1000 units
 *
 * @returns {THREE.PerspectiveCamera} Configured camera positioned to view origin
 */
export function createCamera() {
  const fov = 70;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // Position camera at a diagonal angle to view the mesh clearly
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0); // Point camera at scene origin

  return camera;
}
