varying vec3 vPositionW;
varying vec3 vNormalW;

void main() {
  vec3 color = vec3(1.0);
  vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
  float fresnelTerm = dot(viewDirectionW, vNormalW);
  fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);
  gl_FragColor = vec4( color * fresnelTerm, 1.);
}
