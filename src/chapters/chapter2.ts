import * as THREE from "three";
export class Chapter2 {
  private group = new THREE.Group();
  private mat = new THREE.ShaderMaterial();
  private colorIndex = 0;
  private colors: THREE.Color[] = [
    new THREE.Color(0xff0000),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff),
  ];
  private swaps = ["", "grba", "gbra"];
  private swapIndex = 0;

  constructor() {
    const geo = new THREE.PlaneGeometry(2, 2);
    const fragmentShader = `
    uniform vec3 u_color;

    void main() {
        gl_FragColor = vec4(u_color, 1.0);
    }
    `;
    this.mat.fragmentShader = fragmentShader;
    this.mat.uniforms = {
      u_color: { value: this.colors[this.colorIndex] },
    };
    this.mat.needsUpdate = true;
    const mesh = new THREE.Mesh(geo, this.mat);
    this.group.add(mesh);
  }

  public switchColor() {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.mat.uniforms.u_color.value = this.colors[this.colorIndex];
  }

  public switchRGB() {
    this.swapIndex = (this.swapIndex + 1) % this.swaps.length;
    const swap = this.swaps[this.swapIndex];
    const fragmentShader = `
    uniform vec3 u_color;

    void main() {
        gl_FragColor = vec4(u_color, 1.0)${swap ? "." + swap : ""};
    }
    `;
    this.mat.fragmentShader = fragmentShader;
    this.mat.needsUpdate = true;
  }

  get scene() {
    return this.group;
  }
}
