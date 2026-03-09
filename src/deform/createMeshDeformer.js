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
    const colors = mesh.geometry.attributes.color.array;

    // Iterate through all vertices (3 components per vertex: x, y, z)
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const z = originalPositions[i + 2];

      // Calculate new Y position using the height function
      const y = heightFunction(x, z, time, params);

      // Reset X and Z to original positions
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;

      const colorIndex = i;

      // Normalize height
      const h = (y + params.amplitude) / (params.amplitude * 2); // Because we know the min and max values are [-A, A] where A = amplitude
      colors[colorIndex] = h; // R
      colors[colorIndex + 1] = 0.5 * h; // G, can also be (1 - Math.abs(h - 0.5) * 2) for the green value to be visible
      colors[colorIndex + 2] = 1 - h; // B
    }

    // Notify Three.js that positions and color have changed
    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.attributes.color.needsUpdate = true;

    // Recalculate normals for proper lighting
    mesh.geometry.computeVertexNormals();
  };
}
