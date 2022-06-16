varying vec3 vPositionW;
varying vec3 vNormalW;

uniform samplerCube u_samplerCube;

void main() {
  vec3 color = vec3(1.0);
  vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
  float fresnelTerm = dot(viewDirectionW, vNormalW);
  fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);
  vec3 reflection = reflect(viewDirectionW, vNormalW);
  vec3 envMap = textureCube(u_samplerCube, reflection).rgb;
  gl_FragColor = vec4( envMap + fresnelTerm * color, 1.);
}
