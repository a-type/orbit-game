import React, { FC } from "react";
import { Vector3 } from "three";

export interface CubeProps {
  position: [number, number, number] | Vector3;
}

const Cube: FC<CubeProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

export default Cube;
