import * as THREE from "three";

export class Chapter9 {
  private clock = new THREE.Clock();
  private geo = new THREE.PlaneGeometry(20, 20);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: this.clock.getElapsedTime() },
      u_fract: { value: { x: 3, y: 5 } },
    },
    vertexShader: `
        varying vec2 v_uv;

        void main() {
            v_uv = uv;

            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float u_time;
        varying vec2 v_uv;
        uniform vec2 u_fract;

        float isRect(vec2 point, vec2 center, vec2 halfDims) {
            return step(abs(point.x - center.x), halfDims.x)
                * step(abs(point.y - center.y), halfDims.y);
        }

        mat2 getRotationMat(float theta) {
            float s = sin(theta);
            float c = cos(theta);
            return mat2(c, s, -s, c);
        }

        mat3 getRotationMat(float theta, vec2 translate) {
            float s = sin(theta);
            float c = cos(theta);
  
            float x = translate.x;
            float y = translate.y;
  
            return mat3(
              c, s, 0,
              -s, c, 0,
              x - c * x + s * y, y - s * x - c * y, 1
            );
          }

        void main() {
            vec2 center = vec2(0.5, 0.5);
            vec2 halfDims = vec2(0.2,0.2);
            mat3 rotationMat = getRotationMat(u_time, center);
            gl_FragColor = vec4(
                isRect((rotationMat * vec3(fract(v_uv * u_fract), 1.0)).xy,
                center, halfDims),
                0.0, 0.0, 1.0);
        }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.updateOnAnimationFrame = this.updateOnAnimationFrame.bind(this);
  }

  public updateOnAnimationFrame() {
    this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get x() {
    return this.mat.uniforms.u_fract.value.x;
  }

  public set x(val: number) {
    if (val >= 1) this.mat.uniforms.u_fract.value.x = val;
  }

  public get y() {
    return this.mat.uniforms.u_fract.value.y;
  }

  public set y(val: number) {
    if (val >= 1) this.mat.uniforms.u_fract.value.y = val;
  }

  public get scene() {
    return this.mesh;
  }
}
