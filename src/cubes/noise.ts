import { Vector3 } from 'three';
import { setValue } from './voxelField';
import n from 'noisejs';

const noise = new (n as any).Noise();
const noiseScaling = 1 / 16;

export function generatePerlinVoxelField(
  field: Float32Array,
  size: number,
  offset: Vector3 = new Vector3(0, 0, 0),
) {
  let px = 0,
    py = 0,
    pz = 0;
  for (px = 0; px <= size; px++) {
    const x = Math.floor(px + offset.x);
    for (py = 0; py <= size; py++) {
      const y = Math.floor(py + offset.y);
      for (pz = 0; pz <= size; pz++) {
        const z = Math.floor(pz + offset.z);
        setValue(
          field,
          size,
          px,
          py,
          pz,
          Math.max(
            0,
            noise.perlin3(x * noiseScaling, y * noiseScaling, z * noiseScaling),
          ),
        );
      }
    }
  }
}

export function generateStrata(
  field: Float32Array,
  size: number,
  offset: Vector3 = new Vector3(0, 0, 0),
) {
  let px = 0,
    py = 0,
    pz = 0;
  for (px = 0; px <= size; px++) {
    const x = Math.floor(py + offset.x);
    for (py = 0; py <= size; py++) {
      const y = Math.floor(py + offset.y);
      for (pz = 0; pz <= size; pz++) {
        const z = Math.floor(pz + offset.z);
        setValue(field, size, px, py, pz, y % 4 === 0 ? 1 : 0);
      }
    }
  }
}

export function generateCubes(
  field: Float32Array,
  size: number,
  offset: Vector3 = new Vector3(0, 0, 0),
) {
  let px = 1,
    py = 1,
    pz = 1;
  for (px = 1; px < size - 1; px++) {
    for (py = 1; py < size - 1; py++) {
      for (pz = 1; pz < size - 1; pz++) {
        setValue(field, size, px, py, pz, 1);
      }
    }
  }
}

export function generateAxes(
  field: Float32Array,
  size: number,
  offset: Vector3 = new Vector3(0, 0, 0),
) {
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
          px === size / 2 || py === size / 2 || pz === size / 2 ? 0 : 1,
        );
      }
    }
  }
}
