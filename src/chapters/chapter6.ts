import * as THREE from "three";

enum FragmentShaderGradientType {
  Position = "Position",
  UV = "UV",
}

export class Chapter6 {
  private gradient = FragmentShaderGradientType.UV;
  private size_ = 20;
  private geo = new THREE.PlaneGeometry(this.size_, this.size_);
  private mat = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec2 v_uv;
        varying vec3 v_position;

        void main() {
            v_uv = uv;
            v_position = position;
            gl_Position = projectionMatrix * modelViewMatrix
            * vec4(position, 1.0);
        }
        `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.updateFragmentShader();
  }

  public switchGradient() {
    this.gradient =
      this.gradient === FragmentShaderGradientType.Position
        ? FragmentShaderGradientType.UV
        : FragmentShaderGradientType.Position;
    this.updateFragmentShader();
  }

  private updateFragmentShader() {
    const varyingVariable =
      this.gradient === FragmentShaderGradientType.Position
        ? "v_position"
        : "v_uv";
    this.mat.fragmentShader = `
        varying vec2 v_uv;
        varying vec3 v_position;

        void main() {
            gl_FragColor = vec4(${varyingVariable}.x,
                ${varyingVariable}.y, 0.0, 1.0);
        }
    `;
    this.mat.needsUpdate = true;
  }

  public get size() {
    return this.size_;
  }

  public set size(val: number) {
    if (val < 1) return;
    this.geo.computeBoundingBox();
    const realSize = this.geo.boundingBox!.max.x - this.geo.boundingBox!.min.x;
    const scale = val / realSize;
    if (scale === 1) return;
    this.size_ = val;
    this.geo.scale(scale, scale, 0);
  }

  public get scene() {
    return this.mesh;
  }
}
