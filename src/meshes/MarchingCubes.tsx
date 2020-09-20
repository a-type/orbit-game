import React, { ReactNode, Suspense, useMemo } from 'react';
import { Material, Vector3 } from 'three';
import generateVoxelGeometry from '../cubes/generateVoxelGeometry';
import usePromise from 'react-promise-suspense';

export type MarchingCubesChunkProps = {
  coordinate: ChunkCoordinate;
  generate: (coordinate: ChunkCoordinate) => Promise<Float32Array>;
  material?: Material;
};

export function MarchingCubesChunk(props: MarchingCubesChunkProps) {
  return (
    <Suspense fallback={null}>
      <MarchingCubesChunkMesh {...props} />
    </Suspense>
  );
}

function getChunkPosition(coordinate: ChunkCoordinate) {
  return new Vector3(
    coordinate.x * coordinate.size,
    coordinate.y * coordinate.size,
    coordinate.z * coordinate.size,
  );
}

function MarchingCubesChunkMesh({
  coordinate,
  generate,
  ...rest
}: MarchingCubesChunkProps) {
  const geometry = usePromise(
    async (
      coordinate: ChunkCoordinate,
      generate: (c: ChunkCoordinate) => Promise<Float32Array>,
    ) => {
      const field = await generate(coordinate);
      const { geometry } = await generateVoxelGeometry({
        field,
      });
      return geometry;
    },
    [coordinate, generate],
  );

  const chunkSize = coordinate.size;
  const scale = useMemo(
    () =>
      new Vector3(
        0.5 + chunkSize / 2,
        0.5 + chunkSize / 2,
        0.5 + chunkSize / 2,
      ),
    [chunkSize],
  );

  return (
    <mesh
      geometry={geometry}
      position={getChunkPosition(coordinate)}
      castShadow
      receiveShadow
      scale={scale}
      {...rest}
    />
  );
}

export class ChunkCoordinate {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public size: number,
  ) {}
  get key() {
    return `${this.x}.${this.y}.${this.z}.${this.size}`;
  }
  get volume() {
    return this.size * this.size * this.size;
  }
  get worldCoordinate() {
    return new Vector3(
      this.x * this.size,
      this.y * this.size,
      this.z * this.size,
    );
  }
}

export type MarchingCubesProps = {
  renderDistance: number;
  viewPosition: Vector3;
  chunkSize: number;
  children: (chunksToRender: ChunkCoordinate[]) => ReactNode;
};

function roundVector(vec: Vector3, divisor: number) {
  return [
    Math.round(vec.x / divisor),
    Math.round(vec.y / divisor),
    Math.round(vec.z / divisor),
  ];
}

function useVisibleChunks(
  viewPosition: Vector3,
  chunkSize: number,
  renderDistance: number,
) {
  const [x, y, z] = roundVector(viewPosition, chunkSize);
  return useMemo(() => {
    const visibleChunks: ChunkCoordinate[] = [];
    for (let cx = x - renderDistance; cx <= x + renderDistance; cx++) {
      for (let cy = y - renderDistance; cy <= y + renderDistance; cy++) {
        for (let cz = z - renderDistance; cz <= z + renderDistance; cz++) {
          visibleChunks.push(new ChunkCoordinate(cx, cy, cz, chunkSize));
        }
      }
    }
    return visibleChunks;
  }, [renderDistance, x, y, z, chunkSize]);
}

export function MarchingCubes(props: MarchingCubesProps) {
  const visibleChunks = useVisibleChunks(
    props.viewPosition,
    props.chunkSize,
    props.renderDistance,
  );

  return <group>{props.children(visibleChunks)}</group>;
}
