import React, { useContext, useMemo } from 'react';
import { Vector3, Color, UniformsUtils } from 'three';
import { LightsContext } from '../contexts/lights';

export const TerrainShader = {
  uniforms: UniformsUtils.merge([
    {
      LightPosition: { value: new Vector3() },
    },
  ]),

  vertexShader: `
  varying vec3 Normal;
  void main(void)
  {
    Normal = normalize(gl_NormalMatrix * gl_Normal)
    #ifdef __GLSL_CG_DATA_TYPES // Fix clipping for Nvidia and ATI
    gl_ClipVertex = gl_ModelViewMatrix * gl_Vertex;
    #endif
    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
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
  const { pointLightPosition } = useContext(LightsContext);

  const shaderArgs = useMemo(
    () => ({
      // fog: true,
      // lights: true,
      // dithering: true,
      uniforms: {
        ...TerrainShader.uniforms,
        LightPosition: { value: pointLightPosition },
      },
      vertexShader: TerrainShader.vertexShader,
      fragmentShader: TerrainShader.fragmentShader,
    }),
    [pointLightPosition],
  );

  return <shaderMaterial args={[shaderArgs]} {...rest} />;
};
