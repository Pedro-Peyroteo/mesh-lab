/**
 * Creates a mesh deformation function based on a height function
 *
 * @param {Function} heightFunction - Function that calculates Y coordinate: (x, z, time, params) => y
 * @param {Object} params - Parameters object passed to the height function
 * @param {Float32Array} originalPositions - Original vertex positions to restore X and Z coordinates
 * @returns {Function} Deformation function that takes (mesh, time) and modifies mesh vertices
 */
export function createMeshDeformer(heightFunction, params, originalPositions) {
  /**
   * Applies the height function to all vertices in the mesh
   * @param {THREE.Mesh} mesh - The mesh to deform
   * @param {number} [time=0] - Time parameter for animation
   */
  return function (mesh, time = 0) {
    const positions = mesh.geometry.attributes.position.array;

    // Iterate through all vertices (3 components per vertex: x, y, z)
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const z = originalPositions[i + 2];

      // Reset X and Z to original positions
      positions[i] = x;
      positions[i + 2] = z;

      // Calculate new Y position using the height function
      positions[i + 1] = heightFunction(x, z, time, params);
    }

    // Notify Three.js that positions have changed
    mesh.geometry.attributes.position.needsUpdate = true;

    // Recalculate normals for proper lighting
    mesh.geometry.computeVertexNormals();
  };
}
