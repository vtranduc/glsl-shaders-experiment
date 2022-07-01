uniform sampler2D u_texture;
uniform float u_time;
uniform float u_duration;
uniform float u_haldWidth;

varying vec2 v_uv;
varying vec2 v_position;

void main() {
    float len = length(v_position.xy);


    vec2 ripple = normalize(v_position) * cos(u_time * 1.0 * len);

    vec2 rippleUv =    + ripple;


    vec3 color = texture2D(u_texture, rippleUv).rgb;
    gl_FragColor = vec4(color, 1.0);
}