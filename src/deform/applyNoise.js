import { createNoise3D } from 'simplex-noise';

export function applyNoise(params) {
  const noise3D = createNoise3D();

  return function (mesh, time = 0) {
    const positions = mesh.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];

      const nx = x * params.noiseScale;
      const nz = z * params.noiseScale;

      const noiseValue = noise3D(nx, nz, time * params.noiseSpeed);

      positions[i + 1] = noiseValue * params.noiseAmplitude;
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  };
}
