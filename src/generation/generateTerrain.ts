import { NoiseWorkerInput, NoiseWorkerResult } from './types';

export function generateTerrain(input: NoiseWorkerInput) {
  const worker = new Worker('./noise.worker', {
    name: 'NoiseWorker',
    type: 'module',
  });

  return new Promise<{ field: Float32Array }>((resolve, reject) => {
    worker.addEventListener('message', (ev) => {
      const data = ev.data as NoiseWorkerResult;
      resolve(data);
    });
    worker.postMessage(input);
  });
}
