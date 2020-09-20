export type NoiseWorkerInput = {
  size: number;
  offset: [number, number, number];
};

export type NoiseWorkerResult = {
  field: Float32Array;
};
