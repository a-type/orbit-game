import { RoundedBox } from 'drei';
import * as React from 'react';
import mergeRefs from 'react-merge-refs';
import { useFrame } from 'react-three-fiber';
import { Mesh, Object3D } from 'three';
import { useSphere } from 'use-cannon';

export type PlayerProps = {};

type PublicApi = ReturnType<typeof useSphere>[1];

const speed = 3;
const center = [0, 0, 0];

function useKeyboardControls(api: PublicApi) {
  const keysRef = React.useRef({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  useFrame(() => {
    const { up, down, left, right } = keysRef.current;

    if (up) {
      api.applyLocalImpulse([0, 0, speed], center);
    } else if (down) {
      api.applyLocalImpulse([0, 0, -speed], center);
    }
    if (left) {
      api.applyLocalImpulse([-speed, 0, 0], center);
    } else if (right) {
      api.applyLocalImpulse([speed, 0, 0], center);
    }
  });

  React.useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      switch (ev.key) {
        case 'ArrowUp':
        case 'w':
          keysRef.current.up = true;
          break;
        case 'ArrowDown':
        case 's':
          keysRef.current.down = true;
          break;
        case 'ArrowLeft':
        case 'a':
          keysRef.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
          keysRef.current.right = true;
          break;
      }
    }
    window.addEventListener('keydown', onKeyDown);

    function onKeyUp(ev: KeyboardEvent) {
      switch (ev.key) {
        case 'ArrowUp':
          keysRef.current.up = false;
          break;
        case 'ArrowDown':
          keysRef.current.down = false;
          break;
        case 'ArrowLeft':
          keysRef.current.left = false;
          break;
        case 'ArrowRight':
          keysRef.current.right = false;
          break;
      }
    }
    window.addEventListener('keyup', onKeyUp);

    return function () {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);
}

export const Player = React.forwardRef<Mesh, PlayerProps>(function (
  props,
  ref,
) {
  const internalRef = React.useRef<Mesh>(null);

  const [physicsRef, api] = useSphere(() => ({
    args: 1,
    type: 'Dynamic',
    mass: 1,
    fixedRotation: true,
  }));

  useKeyboardControls(api);

  return (
    <RoundedBox
      radius={0.1}
      args={[0.5, 1, 0.5]}
      ref={mergeRefs<Object3D | undefined>([ref, physicsRef, internalRef])}
      position={[0, 20, 0]}
    >
      <meshToonMaterial color="green" attach="material" />
    </RoundedBox>
  );
});
