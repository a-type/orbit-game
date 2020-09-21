import { OrbitControls, PerspectiveCamera } from 'drei';
import React, { FC, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';
import { Physics } from 'use-cannon';
import { Effects } from './effects/Effects';
import { Ocean } from './entities/Ocean';
import { Player } from './entities/Player';
import { Terrain } from './entities/Terrain';
import styles from './Scene.module.css';

export interface SceneProps {}

const ZERO = new Vector3(0, 0, 0);

const Scene: FC<SceneProps> = () => {
  const playerRef = useRef<Mesh>(null);

  return (
    <Canvas className={styles.scene}>
      <Physics>
        {/* World */}
        <Terrain viewPosition={ZERO} renderDistance={2} />
        <Ocean height={-20} />
        {/* Player */}
        <Player ref={playerRef} />
        {/* <FollowCamera followObject={playerRef.current} /> */}
        {/* Lights */}
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[0, 100, 0]} />
        <ambientLight color="#eee" />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls />
        <Effects />
      </Physics>
    </Canvas>
  );
};

export default Scene;
