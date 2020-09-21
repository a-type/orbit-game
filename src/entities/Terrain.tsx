import * as React from 'react';
import { MeshToonMaterial, Vector3 } from 'three';
import { generateTerrain } from '../generation/generateTerrain';
import {
  ChunkCoordinate,
  MarchingCubes,
  MarchingCubesChunk,
} from '../meshes/MarchingCubes';

export type TerrainProps = {
  viewPosition: Vector3;
  renderDistance: number;
};

async function generateChunk(coord: ChunkCoordinate) {
  const adjustedSize = coord.size + 1;
  const offset: [number, number, number] = [
    coord.worldCoordinate.x,
    coord.worldCoordinate.y,
    coord.worldCoordinate.z,
  ];
  const { field } = await generateTerrain({
    size: adjustedSize,
    offset,
  });
  return field;
}

const chunkMaterial = new MeshToonMaterial({
  color: 'brown',
  wireframe: false,
});

export function Terrain(props: TerrainProps) {
  return (
    <MarchingCubes
      chunkSize={32}
      viewPosition={props.viewPosition}
      renderDistance={props.renderDistance}
    >
      {(chunks) =>
        chunks.map((chunk) => (
          <MarchingCubesChunk
            key={chunk.key}
            coordinate={chunk}
            generate={generateChunk}
            material={chunkMaterial}
          />
        ))
      }
    </MarchingCubes>
  );
}
