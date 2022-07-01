varying vec3 vPositionW;
varying vec3 vNormalW;
uniform samplerCube u_samplerCube;


void main() {
  vec3 color = vec3(1.0);
  vec3 viewDirectionW = normalize(vPositionW - cameraPosition);

  // Flipped x component to match scene's background
  viewDirectionW.x = -viewDirectionW.x;
  vec3 invertedNormal = vec3(-vNormalW.x, vNormalW.yz);

  vec3 reflection = reflect(viewDirectionW, invertedNormal);
  vec3 envMap = (textureCube(u_samplerCube, reflection)).rgb;

  gl_FragColor = vec4(envMap, 1.);
}
