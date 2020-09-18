// import random from 'seedrandom';
// @ts-ignore
import tumult from 'tumult';
import { setValue } from './voxelField';

const noiseSize = 4;
const seed = 'seed' + Math.random() * 100000;
// const rand = random(seed);
const noiseDampening = 0;

export function generatePerlinVoxelField(field: Float32Array, size: number) {
  const noiseScaling = noiseSize / size;
  const perlin = new tumult.Perlin3(seed);

  let px = 0,
    py = 0,
    pz = 0;
  for (px = 0; px < size; px++) {
    for (py = 0; py < size; py++) {
      for (pz = 0; pz < size; pz++) {
        setValue(
          field,
          size,
          px,
          py,
          pz,
          Math.max(
            0,
            perlin.gen(
              px * noiseScaling,
              py * noiseScaling,
              pz * noiseScaling,
            ) - noiseDampening,
          ),
        );
      }
    }
  }
}
