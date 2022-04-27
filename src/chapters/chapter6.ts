import * as THREE from "three";

enum FragmentShaderGradientType {
  Position = "Position",
  UV = "UV",
  Step = "Step",
  Smooth = "Smooth",
}

export class Chapter6 {
  private gradientTypes = Object.values(FragmentShaderGradientType);
  private gradientIndex = 0;
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_size: { value: 1 },
      u_smooth: { value: 0.1 },
      u_step: { value: { x: 0.2, y: 0.1 } },
    },
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
    this.gradientIndex = ++this.gradientIndex % this.gradientTypes.length;
    this.updateFragmentShader();
  }

  private updateFragmentShader() {
    const gradient = this.gradientTypes[this.gradientIndex];

    let varyingVariable = "";
    let fragColor = "";

    switch (gradient) {
      case FragmentShaderGradientType.Position:
        varyingVariable = `
            varying vec3 v_position;
            uniform float u_size;
        `;
        fragColor = `
            float halfSize = u_size / 2.0;
            vec3 color = vec3(0.0);
            color.r = clamp(v_position.x / halfSize, 0.0, 1.0);
            color.g = clamp(v_position.y / halfSize, 0.0, 1.0);
            gl_FragColor = vec4(color, 1.0);
        `;
        break;
      case FragmentShaderGradientType.UV:
        varyingVariable = "varying vec2 v_uv;";
        fragColor = "gl_FragColor = vec4(v_uv.x, v_uv.y, 0.0, 1.0);";
        break;
      case FragmentShaderGradientType.Step:
        varyingVariable = `
            varying vec3 v_position;
            uniform float u_size;
            uniform vec2 u_step;
        `;
        fragColor = `
            float halfSize = u_size / 2.0;
            vec3 color = vec3(0.0);
            color.r = step(u_step.x, v_position.x / halfSize);
            color.g = step(u_step.y, v_position.y / halfSize);
            gl_FragColor = vec4(color, 1.0);
        `;
        break;
      case FragmentShaderGradientType.Smooth:
        varyingVariable = `
            varying vec3 v_position;
            uniform float u_size;
            uniform vec2 u_step;
            uniform float u_smooth;
        `;
        fragColor = `
            float halfSize = u_size / 2.0;
            float halfSmooth = u_smooth / 2.0;
            vec3 color = vec3(0.0);

            color.r = smoothstep(
                clamp(u_step.x - halfSmooth, -1.0, 1.0),
                clamp(u_step.x + halfSmooth, -1.0, 1.0),
                v_position.x / halfSize);
            color.g = smoothstep(
                clamp(u_step.y - halfSmooth, -1.0, 1.0),
                clamp(u_step.y + halfSmooth, -1.0, 1.0),
                v_position.y / halfSize);
            gl_FragColor = vec4(color, 1.0);
        `;
        break;
      default:
        fragColor = "gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);";
    }

    this.mat.fragmentShader = `
        ${varyingVariable}
        void main() {
            ${fragColor}
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

  public get xStep() {
    return this.mat.uniforms.u_step.value.x;
  }

  public set xStep(val: number) {
    if (val > 1 || val < -1) return;
    this.mat.uniforms.u_step.value.x = val;
  }

  public get yStep() {
    return this.mat.uniforms.u_step.value.y;
  }

  public set yStep(val: number) {
    if (val > 1 || val < -1) return;
    this.mat.uniforms.u_step.value.y = val;
  }

  public get smooth() {
    return this.mat.uniforms.u_smooth.value;
  }

  public set smooth(val: number) {
    if (val > 2 || val < 0) return;
    this.mat.uniforms.u_smooth.value = val;
  }

  private get actualSize() {
    this.geo.computeBoundingBox();
    return this.geo.boundingBox!.max.x - this.geo.boundingBox!.min.x;
  }

  public get scene() {
    return this.mesh;
  }
}
