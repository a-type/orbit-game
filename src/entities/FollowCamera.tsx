import * as React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';

export type FollowCameraProps = {
  followObject: Object3D | null;
};

export function FollowCamera({ followObject }: FollowCameraProps) {
  const ref = React.useRef<PerspectiveCamera>();
  const { setDefaultCamera } = useThree();
  React.useEffect(() => void setDefaultCamera(ref.current!), [
    setDefaultCamera,
  ]);
  useFrame(() => {
    const camera = ref.current!;
    camera.updateMatrixWorld();
    if (!followObject) return;
    const offset = new Vector3(0, 10, 10).applyQuaternion(
      followObject.quaternion,
    );
    camera.position.copy(followObject.position.add(offset));
    camera.lookAt(followObject.position);
  });

  return <perspectiveCamera ref={ref} />;
}
