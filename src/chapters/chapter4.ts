import * as THREE from "three";

export class Chapter4 {
  private clock = new THREE.Clock();
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: this.clock.getElapsedTime() },
    },
    fragmentShader: `
    uniform float u_time;

    void main() {
        gl_FragColor = vec4(
            (sin(u_time) + 1.0) / 2.0,
            0.0,
            (cos(u_time) + 1.0) / 2.0,
            1.0
        );
    }
    `,
  });
  private mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);

  public updateUniform() {
    this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get scene() {
    return this.mesh;
  }
}
