import { NoiseWorkerInput, NoiseWorkerResult } from './types';
import NoiseWorker from './noise.worker';

export function generateTerrain(input: NoiseWorkerInput) {
  const worker: Worker = new NoiseWorker();

  return new Promise<{ field: Float32Array }>((resolve, reject) => {
    worker.addEventListener('message', (ev) => {
      const data = ev.data as NoiseWorkerResult;
      resolve(data);
    });
    worker.postMessage(input);
  });
}
