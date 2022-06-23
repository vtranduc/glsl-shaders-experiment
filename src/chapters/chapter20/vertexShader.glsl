varying vec3 vPositionW;
varying vec3 vNormalW;

void main() {
	vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
	vNormalW = normalize((modelMatrix * vec4( normal, 0.0 )).xyz);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
