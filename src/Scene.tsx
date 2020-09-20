import { OrbitControls, PerspectiveCamera } from 'drei';
import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import { Effects } from './effects/Effects';
import { Ocean } from './meshes/Ocean';
import { Terrain } from './meshes/Terrain';
import styles from './Scene.module.css';

export interface SceneProps {}

const ZERO = new Vector3(0, 0, 0);

const Scene: FC<SceneProps> = () => {
  return (
    <Canvas className={styles.scene}>
      <Terrain viewPosition={ZERO} renderDistance={2} />
      <Ocean height={-20} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[0, 100, 0]} />
      <ambientLight color="#eee" />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls />
      <Effects />
    </Canvas>
  );
};

export default Scene;
