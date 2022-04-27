import * as THREE from "three";

export class Chapter8 {
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
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

        float isRect(vec2 position, vec2 size) {
            vec2 halfSize = size / 2.0;
            vec2 isInside = step(-halfSize, position) - step(halfSize, position);
            return isInside.x * isInside.y;
        }

        void main() {
            vec2 size = vec2(0.5, 0.5);
            float r = isRect(v_position.xy, size);
            gl_FragColor = vec4(r, 0.0, 1.0, 1.0);
        }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  public get scene() {
    return this.mesh;
  }
}
