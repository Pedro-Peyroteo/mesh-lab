export function createMeshDeformer(heightFunction, params, originalPositions) {
  return function (mesh, time = 0) {
    const positions = mesh.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const z = originalPositions[i + 2];

      positions[i] = x;
      positions[i + 2] = z;

      positions[i + 1] = heightFunction(x, z, time, params);
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  };
}
