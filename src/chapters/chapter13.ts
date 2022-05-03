import * as THREE from "three";

export class Chapter13 {
  private clock = new THREE.Clock();
  private geo = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);
  private mat = new THREE.ShaderMaterial({
    wireframe: true,
    uniforms: {
      u_time: { value: this.clock.getElapsedTime() },
      u_radius: { value: 30 },
    },
    vertexShader: `
        uniform float u_time;
        uniform float u_radius;
        void main() {
            float delta = (sin(u_time * 3.0) + 1.0) / 2.0;
            vec3 pos = mix(position, normalize(position) * u_radius, delta);
            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(pos, 1.0);
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

  public get scene() {
    return this.mesh;
  }
}
