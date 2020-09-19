import { Color, Vector3 } from 'three';
import { createContext } from 'react';

export const LightsContext = createContext({
  pointLightPosition: new Vector3(0, 100, -40),
  pointLightColor: new Color('#fff'),
  ambientLightColor: new Color('#aaa'),
});
