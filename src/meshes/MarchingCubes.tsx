import React, { FC, useEffect, useRef, useState } from 'react';
import { BufferGeometry, Group } from 'three';
import generateVoxelGeometry from '../cubes/generateVoxelGeometry';
import { generatePerlinVoxelField } from '../cubes/noise';

export interface MarchingCubesProps {}

const MarchingCubes: FC<MarchingCubesProps> = ({}) => {
  const ref = useRef<Group>();
  const [geometry, setGeometry] = useState<BufferGeometry | undefined>(
    undefined,
  );

  useEffect(() => {
    const size = 16;
    const field = new Float32Array(size * size * size);
    generatePerlinVoxelField(field, size);
    generateVoxelGeometry({ size, field }).then(({ geometry }) => {
      setGeometry(geometry);
    });
  }, []);

  return (
    <group ref={ref}>
      <mesh geometry={geometry}>
        <meshPhongMaterial color="green" attach="material" />
      </mesh>
    </group>
  );
};

export default MarchingCubes;
