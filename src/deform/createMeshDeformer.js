export function createMeshDeformer(heightFunction, params) {
  return function (mesh) {
    const positions = mesh.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];

      positions[i + 1] = heightFunction(x, z, params);
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  };
}
