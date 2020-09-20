import { setValue } from '../cubes/voxelField';
import n from 'noisejs';

const noise = new (n as any).Noise() as n;
const noiseScale3d = 1 / 16;
const absoluteCeiling = 8;
const heightmapScale = 72;
const heightmapHilliness = 16;
const heightmapFloor = -80;
const structureScale = 50;
const structureMultiplier = 150;
const structureCeilingScale = 30;
const structureCeilingMultiplier = 30;
const structureCeilingOffset = 20;
const structureMaskScale = 80;
const highgroundCeilingScale = 50;
const highgroundCeilingMultiplier = 300;
const highgroundCeilingOffset = 40;
const highgroundMaskScale = 120;
const highgroundExponent = 1.2;

const blocky = true;

function postProcess(value: number) {
  if (blocky) {
    if (value > 0.01) return 1;
    return 0;
  }
  return value;
}

function getMaskedHeightmapValue(
  x: number,
  y: number,
  z: number,
  {
    scale,
    multiplier,
    offset,
    maskScale,
    exponent = 1,
  }: {
    scale: number;
    multiplier: number;
    offset: number;
    maskScale: number;
    exponent?: number;
  },
) {
  const rawValue = Math.pow(
    postProcess(noise.perlin2(x / scale + 1, z / scale + 1) * multiplier) +
      offset,
    exponent,
  );

  const mask2d = Math.max(
    0,
    noise.perlin2(x / maskScale, z / maskScale) * rawValue - y,
  );

  return rawValue * mask2d;
}

function getStructureCeilingValue(x: number, y: number, z: number) {
  return getMaskedHeightmapValue(x, y, z, {
    scale: structureCeilingScale,
    multiplier: structureCeilingMultiplier,
    offset: structureCeilingOffset,
    maskScale: structureMaskScale,
  });
}

function getHighgroundValue(x: number, y: number, z: number) {
  return getMaskedHeightmapValue(x, y, z, {
    scale: highgroundCeilingScale,
    multiplier: highgroundCeilingMultiplier,
    offset: highgroundCeilingOffset,
    maskScale: highgroundMaskScale,
    exponent: highgroundExponent,
  });
}

function getStructureValue(x: number, y: number, z: number) {
  const rawValue =
    noise.perlin3(x / structureScale, y / structureScale, z / structureScale) *
    structureMultiplier;
  const structureCeilingValue = getStructureCeilingValue(x, y, z);
  const highgroundValue = getHighgroundValue(x, y, z);
  const ceilingValue = Math.max(structureCeilingValue, highgroundValue);
  if (y > ceilingValue) return 0;
  return rawValue;
}

function getHeightmapValue(x: number, y: number) {
  return Math.floor(
    noise.perlin2(x / heightmapScale + 1, y / heightmapScale + 1) *
      heightmapHilliness +
      heightmapFloor,
  );
}

function getTerrainValue(x: number, y: number, z: number) {
  let value = 0;
  const heightmapValue = getHeightmapValue(x, z);
  // fill in below heightmap
  value = y < heightmapValue ? 1 : 0;

  if (value === 0) {
    // empty sky above heightmap
    value = getStructureValue(x, y, z);
  }

  return postProcess(value);
}

export function generateTerrainVoxels(
  size: number,
  offset: [number, number, number] = [0, 0, 0],
) {
  const field = new Float32Array(Math.pow(size, 3));

  let px = 0,
    py = 0,
    pz = 0;
  for (px = 0; px <= size; px++) {
    const x = Math.floor(px + offset[0]);
    for (py = 0; py <= size; py++) {
      const y = Math.floor(py + offset[1]);
      for (pz = 0; pz <= size; pz++) {
        const z = Math.floor(pz + offset[2]);
        setValue(field, size, px, py, pz, getTerrainValue(x, y, z));
      }
    }
  }

  return field;
}

// saved for future use - very thin and winding terrain
export function generateInterestingFeatures(
  size: number,
  offset: [number, number, number] = [0, 0, 0],
) {
  const field = new Float32Array(Math.pow(size, 3));

  let px = 0,
    py = 0,
    pz = 0;
  for (px = 0; px <= size; px++) {
    const x = Math.floor(px + offset[0]);
    for (py = 0; py <= size; py++) {
      const y = Math.floor(py + offset[1]);
      for (pz = 0; pz <= size; pz++) {
        const z = Math.floor(pz + offset[2]);

        const value3d = Math.max(
          0,
          noise.perlin3(x * noiseScale3d, y * noiseScale3d, z * noiseScale3d),
        );

        const heightMult = Math.pow(Math.max(0, absoluteCeiling - y), 3);
        const value2d = Math.max(0, noise.perlin2(x / 8, z / 8));

        const value = value3d * heightMult * value2d;

        setValue(field, size, px, py, pz, value);
      }
    }
  }

  return field;
}
