import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import Cube from './meshes/Cube';
import styles from './Scene.module.css';

export interface SceneProps {}

const Scene: FC<SceneProps> = ({}) => {
  return (
    <Canvas className={styles.scene}>
      <Cube position={[1, 1, 1]} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
};

export default Scene;
