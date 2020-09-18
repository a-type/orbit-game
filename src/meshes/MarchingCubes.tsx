import React, { FC, useRef } from 'react';
import { Group } from 'three';
import generateVoxelGeometry from '../cubes/generateVoxelGeometry';
import usePromise from 'react-promise-suspense';
import { generatePerlinVoxelField } from '../cubes/noise';

export interface MarchingCubesProps {
  field: Float32Array;
  size: number;
}

const MarchingCubes: FC<MarchingCubesProps> = (props) => {
  const ref = useRef<Group>();

  const geometry = usePromise(
    (field, size) => {
      generatePerlinVoxelField(field, size);
      return generateVoxelGeometry({ size, field }).then(({ geometry }) => {
        return geometry;
      });
    },
    [props.field, props.size],
  );

  return (
    <group ref={ref}>
      <mesh geometry={geometry}>
        <meshPhongMaterial color="green" attach="material" />
      </mesh>
    </group>
  );
};

export default MarchingCubes;
