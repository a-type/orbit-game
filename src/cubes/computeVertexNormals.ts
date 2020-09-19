export function computeVertexNormals(
  vertices: Float32Array,
  normals: Float32Array,
  dst?: Float32Array,
) {
  console.time('computeVertexNormals');
  if (dst === undefined) {
    dst = new Float32Array(normals.length);
  }
  var vertexNormals = [];
  for (var i = 0; i < vertices.length; i += 3) {
    var key1 = (vertices[i + 2] << 20) + (vertices[i + 1] << 10) + vertices[i];
    if (vertexNormals[key1] === undefined) {
      vertexNormals[key1] = [0, 0, 0];
    }
    var nml1 = vertexNormals[key1];
    nml1[0] += normals[i];
    nml1[1] += normals[i + 1];
    nml1[2] += normals[i + 2];
  }
  for (var j = 0; j < vertices.length; j += 3) {
    var key = (vertices[j + 2] << 20) + (vertices[j + 1] << 10) + vertices[j];
    var nml = vertexNormals[key];
    dst[j] = nml[0];
    dst[j + 1] = nml[1];
    dst[j + 2] = nml[2];
  }
  console.timeEnd('computeVertexNormals');
  return dst;
}
