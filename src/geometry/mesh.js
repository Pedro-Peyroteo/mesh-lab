/**
 * Mesh geometry creation utilities
 * Handles custom geometry creation for wireframe rendering
 */

import * as THREE from 'three';

/**
 * Creates a procedural grid mesh positioned on the XZ plane
 * The grid is subdivided into triangulated quads for wireframe rendering
 *
 * @param {number} size - The total size of the grid (default: 10)
 * @param {number} divisions - Number of subdivisions along each axis (default: 10)
 * @returns {THREE.Mesh} A wireframe mesh of a subdivided grid
 */
export function createGridMesh(size = 10, divisions = 10) {
  const vertices = [];
  const indices = [];

  // Generate vertices in a grid pattern on the XZ plane
  // Creates (divisions + 1)² vertices, centered at origin
  for (let z = 0; z <= divisions; z++) {
    for (let x = 0; x <= divisions; x++) {
      const xPos = (x / divisions - 0.5) * size;
      const zPos = (z / divisions - 0.5) * size;

      vertices.push(xPos, 0, zPos);
    }
  }

  // Generate triangle indices for each grid cell
  // Each cell is split into two triangles
  for (let z = 0; z < divisions; z++) {
    for (let x = 0; x < divisions; x++) {
      // Calculate vertex indices for the current quad cell
      const a = x + (divisions + 1) * z; // Bottom-left
      const b = x + (divisions + 1) * (z + 1); // Top-left
      const c = x + 1 + (divisions + 1) * z; // Bottom-right
      const d = x + 1 + (divisions + 1) * (z + 1); // Top-right

      // First triangle (a, b, c)
      indices.push(a, b, c);
      // Second triangle (c, b, d)
      indices.push(c, b, d);
    }
  }

  // Create Three.js buffer geometry
  const geometry = new THREE.BufferGeometry();

  const vertexCount = vertices.length / 3;
  const colors = new Float32Array(vertexCount * 3);

  // Set vertex positions (3 components per vertex: x, y, z)
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Set triangle indices
  geometry.setIndex(indices);

  // Calculate normals for proper lighting (even though not used in wireframe)
  geometry.computeVertexNormals();

  // Create bright green wireframe material
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
