varying vec2 v_uv;
uniform float u_time;
uniform int u_layer;

float random(vec2 xy) {
    return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453);
}

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

vec2 getPos(float x1, float x2, float y1, float y2) {
  return vec2(v_uv.x * x1 + x2, v_uv.y * y1 - u_time * y2);
}

void main() {
  float n = 0.0;

  if (u_layer == 1) n += noise(getPos(1.4, 0.01, 1.0, 0.69) * 12.0);
  else if (u_layer == 2) n += noise(getPos(0.5, - 0.033, 2.0, 0.12) * 8.0);
  else if (u_layer == 3) n += noise(getPos(0.94, - 0.02, 3.0, 0.61) * 4.0);
  else {
    n += noise(getPos(1.4, 0.01, 1.0, 0.69) * 12.0);
    n += noise(getPos(0.5, - 0.033, 2.0, 0.12) * 8.0);
    n += noise(getPos(0.94, - 0.02, 3.0, 0.61) * 4.0);
    n /= 3.0;
  }
  
  vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 0.0), n);
  gl_FragColor = vec4(color, 1.0);
}
