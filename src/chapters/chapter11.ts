import * as THREE from "three";

export class Chapter11 {
  private geo = new THREE.PlaneGeometry(20, 20);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_type: { value: 1 },
      u_thickness: { value: 0.8 },
      u_amplitude: { value: 0.5 },
      u_frequency: { value: 1 },
      u_width: { value: 0.03 },
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
      #define Pi 3.1415926535897932384626433832795
      varying vec2 v_uv;
      uniform int u_type;
      uniform float u_thickness;
      uniform float u_amplitude;
      uniform float u_frequency;
      uniform float u_width;
      
      float line(float y, float val, float width, float thickness) {
        float halfWidth = width / 2.0;
        float lowerEnd = val - halfWidth;
        float higherEnd = val + halfWidth;
        if (thickness == 0.0) return step(lowerEnd, y) -  step(higherEnd, y);
        float absoluteThickness = width * thickness;
        return smoothstep(lowerEnd, lowerEnd + absoluteThickness, y)
         - smoothstep(higherEnd, higherEnd + absoluteThickness, y);
      }

      float diagonal(float x) {
        return x;
      }

      float sine(float x) {
        return u_amplitude * sin(x * (2. * Pi * u_frequency)) + 0.5;
      }

      void main() {
        float val = 0.;
        switch (u_type) {
          case 0:
            val = diagonal(v_uv.x);
            break;
          case 1:
            val = sine(v_uv.x);
            break;
          default:
            break;
        }
        vec3 rgb = vec3(1.0) * line(v_uv.y, val, u_width, u_thickness);
        gl_FragColor = vec4(rgb, 1.0);
      }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  public switch() {
    this.mat.uniforms.u_type.value = (this.mat.uniforms.u_type.value + 1) % 2;
  }

  public get amplitude() {
    return this.mat.uniforms.u_amplitude.value;
  }

  public set amplitude(val: number) {
    if (val < 0) this.mat.uniforms.u_amplitude.value = 0;
    else this.mat.uniforms.u_amplitude.value = val;
  }

  public get frequency() {
    return this.mat.uniforms.u_frequency.value;
  }

  public set frequency(val: number) {
    if (val < 0) this.mat.uniforms.u_frequency.value = 0;
    else this.mat.uniforms.u_frequency.value = val;
  }

  public get width() {
    return this.mat.uniforms.u_width.value;
  }

  public set width(val: number) {
    if (val > 0) this.mat.uniforms.u_width.value = val;
  }

  public get thickness() {
    return this.mat.uniforms.u_thickness.value;
  }

  public set thickness(val: number) {
    if (val < 0) this.mat.uniforms.u_thickness.value = 0;
    else if (val > 1) this.mat.uniforms.u_thickness.value = 1;
    else this.mat.uniforms.u_thickness.value = val;
  }

  public get scene() {
    return this.mesh;
  }
}
