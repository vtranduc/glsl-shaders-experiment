import * as THREE from "three";

enum FragmentShaderGradientType {
  Position = "Position",
  UV = "UV",
}

export class Chapter6 {
  private gradient = FragmentShaderGradientType.Position;
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
    uniforms: { u_size: { value: 1 } },
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
    this.mat.uniforms.u_size.value = this.actualSize;
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
        ? `
            varying vec3 v_position;
            uniform float u_size;
        `
        : "varying vec2 v_uv;";
    const fragColorAssignment =
      this.gradient === FragmentShaderGradientType.UV
        ? "gl_FragColor = vec4(u_uv.x, u_uv.y, 0.0, 1.0);"
        : `
            float halfSize = u_size / 2.0;
            vec3 color = vec3(0.0);
            color.r = clamp(v_position.x / halfSize, 0.0, 1.0);
            color.g = clamp(v_position.y / halfSize, 0.0, 1.0);
            gl_FragColor = vec4(color, 1.0);
        `;
    this.mat.fragmentShader = `
        ${varyingVariable}
        void main() {
            ${fragColorAssignment}
        }
    `;
    this.mat.needsUpdate = true;
  }

  public get size() {
    return this.mat.uniforms.u_size.value;
  }

  public set size(val: number) {
    if (val < 1) return;
    const scale = val / this.actualSize;
    if (scale === 1) return;
    this.geo.scale(scale, scale, 0);
    this.mat.uniforms.u_size.value = val;
  }

  private get actualSize() {
    this.geo.computeBoundingBox();
    return this.geo.boundingBox!.max.x - this.geo.boundingBox!.min.x;
  }

  public get scene() {
    return this.mesh;
  }
}
