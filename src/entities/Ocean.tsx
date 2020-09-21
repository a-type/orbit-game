import { Plane } from 'drei';
import * as React from 'react';
import { Euler, Vector3 } from 'three';

export type OceanProps = {
  height: number;
};

const rotation = new Euler(Math.PI * 1.5, 0, 0);

export function Ocean({ height }: OceanProps) {
  const position = React.useMemo(() => new Vector3(0, height, 0), [height]);

  return (
    <Plane position={position} args={[1000, 1000]} rotation={rotation}>
      <meshPhongMaterial
        attach="material"
        color="blue"
        transparent
        opacity={0.8}
      />
    </Plane>
  );
}
