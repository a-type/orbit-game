import * as React from 'react';
import { Vector3 } from 'three';
import { generateTerrainVoxels } from '../generation/terrain';
import { TerrainShaderMaterial } from '../shaders/TerrainShader';
import {
  ChunkCoordinate,
  MarchingCubes,
  MarchingCubesChunk,
} from './MarchingCubes';

export type TerrainProps = {
  viewPosition: Vector3;
  renderDistance: number;
};

function generateChunk(coord: ChunkCoordinate) {
  const adjustedSize = coord.size + 1;
  const field = generateTerrainVoxels(adjustedSize, coord.worldCoordinate);
  return Promise.resolve(field);
}

export function Terrain(props: TerrainProps) {
  return (
    <MarchingCubes
      chunkSize={64}
      viewPosition={props.viewPosition}
      renderDistance={props.renderDistance}
    >
      {(chunks) =>
        chunks.map((chunk) => (
          <MarchingCubesChunk
            key={chunk.key}
            coordinate={chunk}
            generate={generateChunk}
          >
            <TerrainShaderMaterial attach="material" />
          </MarchingCubesChunk>
        ))
      }
    </MarchingCubes>
  );
}
