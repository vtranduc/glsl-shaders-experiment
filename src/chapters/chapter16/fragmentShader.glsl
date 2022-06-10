uniform float u_time;
varying vec2 v_uv;

// This is a very commonly used random generator function.
// You may use this without deep understanding.

float rand(vec2 xy, float time) {
    return fract(sin(dot(xy, vec2(12.9898, 78.233)) + time) * 43758.5453);
}

void main (void) {
  gl_FragColor = vec4(rand(v_uv, u_time) * vec3(1.0), 1.0);
}