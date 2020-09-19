import { OrbitControls, PerspectiveCamera, Plane } from 'drei';
import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import { Terrain } from './meshes/Terrain';
import styles from './Scene.module.css';

export interface SceneProps {}

const ZERO = new Vector3(0, 0, 0);

const Scene: FC<SceneProps> = () => {
  return (
    <Canvas className={styles.scene}>
      <Terrain viewPosition={ZERO} renderDistance={2} />
      <axesHelper position={[-32, 0, -32]} />
      {/* <Plane
        position={[0, -5, 0]}
        args={[100, 100]}
        rotation={[Math.PI * 1.5, 0, 0]}
      >
        <meshPhongMaterial attach="material" color="white" />
      </Plane> */}
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[0, 100, 0]} />
      <ambientLight color="#eee" />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
