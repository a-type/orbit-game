import { OrbitControls, PerspectiveCamera, Plane } from 'drei';
import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import MarchingCubes from './meshes/MarchingCubes';
import styles from './Scene.module.css';

export interface SceneProps {}

const Scene: FC<SceneProps> = () => {
  return (
    <Canvas className={styles.scene}>
      <MarchingCubes />
      <Plane
        position={[0, -5, 0]}
        args={[100, 100]}
        rotation={[Math.PI * 1.5, 0, 0]}
      >
        <meshPhongMaterial attach="material" color="white" />
      </Plane>
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
