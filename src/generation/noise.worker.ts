import { generateTerrainVoxels } from './terrain';
import { NoiseWorkerInput } from './types';

const context = self; // eslint-disable-line no-restricted-globals

context.addEventListener('message', function (ev) {
  const { size, offset } = ev.data as NoiseWorkerInput;

  const field = generateTerrainVoxels(size, offset);

  (context as any).postMessage({ field });
});
