varying vec3 vPositionW;
varying vec3 vNormalW;

void main() {
	vPositionW = (vec4(position, 1.0) * modelMatrix).xyz;
	vNormalW = normalize( ( vec4( normal, 0.0 ) * modelMatrix ).xyz );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
