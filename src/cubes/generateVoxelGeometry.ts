import { BufferGeometry, BufferAttribute } from 'three';
import { CubeWorkerInput, CubeWorkerResult } from './types';

function concatenate(a: Float32Array, b: Float32Array, length: number) {
  const result = new Float32Array(a.length + length);
  result.set(a, 0);
  result.set(b.slice(0, length), a.length);
  return result;
}

export default (chunkData: CubeWorkerInput) => {
  const worker = new Worker('./cubes.worker', {
    name: 'CubeWorker',
    type: 'module',
  });
  return new Promise<{ geometry: BufferGeometry }>((resolve, reject) => {
    worker.addEventListener('message', (ev) => {
      const data = ev.data as CubeWorkerResult;

      const geometry = new BufferGeometry();
      let positionArray = new Float32Array();
      let normalArray = new Float32Array();
      let colorArray = new Float32Array();
      let uvArray = new Float32Array();

      if (data.hasPositions) {
        positionArray = concatenate(
          positionArray,
          data.positionArray,
          data.count * 3,
        );
        geometry.setAttribute(
          'position',
          new BufferAttribute(positionArray, 3),
        );
      }
      if (data.hasNormals) {
        normalArray = concatenate(
          normalArray,
          data.normalArray,
          data.count * 3,
        );
        geometry.setAttribute('normal', new BufferAttribute(normalArray, 3));
      } else {
        geometry.computeVertexNormals();
      }
      if (data.hasColors) {
        colorArray = concatenate(colorArray, data.colorArray, data.count * 3);
        geometry.setAttribute('color', new BufferAttribute(colorArray, 3));
      }
      if (data.hasUvs) {
        uvArray = concatenate(uvArray, data.uvArray, data.count * 2);
        geometry.setAttribute('uv', new BufferAttribute(uvArray, 2));
      }

      // seems to have issues.
      //geometry.computeBoundingSphere();

      resolve({ geometry });
    });

    worker.postMessage(chunkData);
  });
};
