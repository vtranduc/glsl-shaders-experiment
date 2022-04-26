import * as THREE from "three";

export class Chapter3 {
  private dimensions = { height: 2, width: 2, top: 3, left: -2 };
  private color = new THREE.Color().setRGB(0, 0, 0);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_color: { value: this.color },
      u_resolution: {
        value: { x: this.dimensions.width, y: this.dimensions.height },
      },
      u_position: {
        value: { x: this.dimensions.left, y: this.dimensions.top },
      },
      u_mouse: {
        value: { x: this.dimensions.left, y: this.dimensions.top },
      },
    },
    fragmentShader: `
    // uniform vec3 u_color;
    uniform vec2 u_resolution;
    uniform vec2 u_position;
    uniform vec2 u_mouse;

    void main() {
      vec2 displacement = vec2(u_mouse.x - u_position.x,
        u_position.y - u_mouse.y) / u_resolution;

      vec3 color = vec3(displacement.x, displacement.y, 0.0);
      
      gl_FragColor = vec4(color, 1.0);
    }
    `,
  });
  private mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(this.dimensions.width, this.dimensions.height),
    this.mat
  );

  constructor() {
    const { width, height, top, left } = this.dimensions;
    this.mesh.position.x = left + width / 2;
    this.mesh.position.y = top - height / 2;
  }

  public changeColorByIntersection(point: THREE.Vector3) {
    this.mat.uniforms.u_mouse.value = { x: point.x, y: point.y };
  }

  get scene() {
    return this.mesh;
  }
}
