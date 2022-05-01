import * as THREE from "three";

export class Chapter10 {
  private geo = new THREE.PlaneGeometry(20, 20);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_center1: { value: { x: -2.2, y: 0.3 } },
      u_center2: { value: { x: 2, y: 0.3 } },
      u_radius: { value: 0.8 },
      u_smooth: { value: 0.5 },
      u_lineWidth: { value: 0.2 },
    },
    vertexShader: `
        varying vec3 v_position;
        void main() {
            v_position = position;
            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 v_position;
        uniform vec2 u_center1;
        uniform vec2 u_center2;
        uniform float u_radius;
        uniform float u_smooth;
        uniform float u_lineWidth;

        float onCircumference(vec2 position, vec2 center,
            float radius, float width) {
            float halfWidth = width / 2.0;
            float distance = length(position - center);
            return step(radius - halfWidth, distance)
                * step(distance, radius + halfWidth);
        }

        float inCircle(vec2 position, vec2 center, float radius,
            float smoothRatio) {
            float distance = length(position - center);
            return smoothRatio < 1.0 ?
                smoothstep(radius, radius * smoothRatio, distance)
                : step(distance, radius);
        }

        void main() {
            vec3 rgb = vec3(
                onCircumference(v_position.xy, u_center1, u_radius, u_lineWidth),
                inCircle(v_position.xy, u_center2, u_radius, u_smooth),
                0.0);
            gl_FragColor = vec4(rgb, 1.0);
        }
      `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  public get x1() {
    return this.mat.uniforms.u_center1.value.x;
  }

  public set x1(val: number) {
    this.mat.uniforms.u_center1.value.x = val;
  }

  public get y1() {
    return this.mat.uniforms.u_center1.value.y;
  }

  public set y1(val: number) {
    this.mat.uniforms.u_center1.value.y = val;
  }

  public get x2() {
    return this.mat.uniforms.u_center2.value.x;
  }

  public set x2(val: number) {
    this.mat.uniforms.u_center2.value.x = val;
  }

  public get y2() {
    return this.mat.uniforms.u_center2.value.y;
  }

  public set y2(val: number) {
    this.mat.uniforms.u_center2.value.y = val;
  }

  public get radius() {
    return this.mat.uniforms.u_radius.value;
  }

  public set radius(val: number) {
    if (val > 0) this.mat.uniforms.u_radius.value = val;
  }

  public get lineWidth() {
    return this.mat.uniforms.u_lineWidth.value;
  }

  public set lineWidth(val: number) {
    if (val > 0) this.mat.uniforms.u_lineWidth.value = val;
  }

  public get smooth() {
    return this.mat.uniforms.u_smooth.value;
  }

  public set smooth(val: number) {
    if (val < 0) this.mat.uniforms.u_smooth.value = 0;
    else if (val > 1) this.mat.uniforms.u_smooth.value = 1;
    else this.mat.uniforms.u_smooth.value = val;
  }

  public get scene() {
    return this.mesh;
  }
}
