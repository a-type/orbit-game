import React, { useContext, useMemo } from 'react';
import { Vector3, Color, UniformsLib, UniformsUtils } from 'three';
import { LightsContext } from '../contexts/lights';

export const TerrainShader = {
  uniforms: UniformsUtils.merge([
    UniformsLib.lights,
    UniformsLib.fog,
    {
      uDirLightPos: { value: new Vector3() },
      uDirLightColor: { value: new Color(0xeeeeee) },
      ambientLightColor: { value: new Color(0x050505) },
      uBaseColor: { value: new Color(0xffffff) },
      uLineColor1: { value: new Color(0xa0a0a0) },
      uLineColor2: { value: new Color(0x0000a0) },
    },
  ]),

  vertexShader: `
  #include <common>
  #include <fog_pars_vertex>
  #include <shadowmap_pars_vertex>
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    #include <begin_vertex>
    #include <project_vertex>
    #include <worldpos_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
  }
  `,

  fragmentShader: `
    #include <common>
    #include <packing>
    #include <fog_pars_fragment>
    #include <bsdfs>
    #include <lights_pars_begin>
    #include <shadowmap_pars_fragment>
    #include <shadowmask_pars_fragment>
    #include <dithering_pars_fragment>
    uniform vec3 uBaseColor;
    uniform vec3 uLineColor1;
    uniform vec3 uLineColor2;
    uniform vec3 uDirLightPos;
    uniform vec3 uDirLightColor;
    varying vec3 vNormal;
    void main() {
      float shadowPower = 0.5;
      float directionalLightWeighting = max(dot(normalize(vNormal), uDirLightPos), 0.0);
      vec3 lightWeighting = uDirLightColor * directionalLightWeighting;
      gl_FragColor = vec4( mix(uBaseColor, uLineColor1, (1.0 - getShadowMask() ) * shadowPower), 1.0);
      if (length(lightWeighting) < 1.0) {
        gl_FragColor = vec4( mix(uLineColor1, uLineColor1, (1.0 - getShadowMask() ) * shadowPower), 1.0);
      }
      if (length(lightWeighting) < 0.75) {
        if ((mod(gl_FragCoord.x + 2.0, 4.0001) + mod(gl_FragCoord.y + 2.0, 4.0)) > 6.0) {
          gl_FragColor = vec4( mix(uLineColor2, uLineColor1, (1.0 - getShadowMask() ) * shadowPower), 1.0);
        }
      }
    }
  `,
};

export type TerrainShaderMaterialProps = {
  attach?: string;
  baseColor?: Color;
  shadeColor1?: Color;
  shadeColor2?: Color;
};

export const TerrainShaderMaterial = function ({
  baseColor,
  shadeColor1,
  shadeColor2,
  ...rest
}: TerrainShaderMaterialProps) {
  const { pointLightPosition, pointLightColor, ambientLightColor } = useContext(
    LightsContext,
  );

  const shaderArgs = useMemo(
    () => ({
      fog: true,
      lights: true,
      dithering: true,
      uniforms: {
        ...TerrainShader.uniforms,
        uDirLightPos: { value: pointLightPosition },
        uDirLightColor: { value: pointLightColor },
        ambientLightColor: { value: ambientLightColor },
        uBaseColor: { value: baseColor || new Color('#ffcb8e') },
        uLineColor1: { value: shadeColor1 || new Color('#e97171') },
        uLineColor2: { value: shadeColor2 || new Color('#931a25') },
      },
      vertexShader: TerrainShader.vertexShader,
      fragmentShader: TerrainShader.fragmentShader,
    }),
    [
      pointLightColor,
      pointLightPosition,
      ambientLightColor,
      baseColor,
      shadeColor1,
      shadeColor2,
    ],
  );

  return <shaderMaterial args={[shaderArgs]} {...rest} />;
};
