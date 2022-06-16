uniform float u_time;
varying vec2 v_uv;
uniform bool u_morgan3d;
uniform float u_morgan3dLevel;

// This is a very commonly used random generator function.
// You may use this without deep understanding.

float random(vec2 xy, float time) {
    return fract(sin(dot(xy, vec2(12.9898, 78.233)) + time) * 43758.5453);
}

float random(vec2 xy) {
    return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D Noise based on Morgan McGuire @morgan3d
// You may use this without deep understanding

float noise (vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smooth Interpolation

  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f*f*(3.0-2.0*f);
  // u = smoothstep(0.,1.,f);

  // Mix 4 coorners percentages
  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

void main (void) {
  if (!u_morgan3d) {
    gl_FragColor = vec4(random(v_uv, u_time) * vec3(1.0), 1.0);
    return;
  }
  vec2 pos = vec2(v_uv * u_morgan3dLevel);
  float n = noise(pos);
  gl_FragColor = vec4(vec3(n), 1.0);
}