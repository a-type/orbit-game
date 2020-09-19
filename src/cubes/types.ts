export type CubeWorkerInput = {
  field: Float32Array;
};

export type CubeWorkerResult = {
  hasPositions: boolean;
  positionArray: Float32Array;
  hasNormals: boolean;
  normalArray: Float32Array;
  hasColors: boolean;
  colorArray: Float32Array;
  hasUvs: boolean;
  uvArray: Float32Array;
  count: number;
};
