import * as THREE from "three";

export class Chapter13 {
  private clock = new THREE.Clock();
  private geo = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);
  private mat = new THREE.ShaderMaterial({
    wireframe: true,
    lights: true,
    uniforms: {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib["common"],
        THREE.UniformsLib["lights"],
      ]),
      ...{
        u_time: { value: this.clock.getElapsedTime() },
        u_radius: { value: 30 },
        u_color: { value: { r: 1.0, g: 0.0, b: 0.0 } },
      },
    },
    ...this.getShaders(true),
  });

  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.updateOnAnimationFrame = this.updateOnAnimationFrame.bind(this);
  }

  public toggleWireframe() {
    this.mat.wireframe = !this.mat.wireframe;
  }

  public updateOnAnimationFrame() {
    this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get lights() {
    return this.mat.lights;
  }

  public set lights(lights: boolean) {
    if (this.lights === lights) return;
    const { vertexShader, fragmentShader } = this.getShaders(lights);
    this.mat.vertexShader = vertexShader;
    this.mat.fragmentShader = fragmentShader;
    this.mat.lights = lights;
    this.mat.needsUpdate = true;
  }

  private getShaders(lights: boolean) {
    return {
      vertexShader: `
            ${
              lights
                ? `
                    #include <common>
                    #include <lights_pars_begin>
                    varying vec3 vLightIntensity;
                `
                : ""
            }

            uniform float u_time;
            uniform float u_radius;

            void main() {
                float delta = (sin(u_time * 3.0) + 1.0) / 2.0;
                vec3 normalSphere = normalize(position);

                ${
                  lights
                    ? `
                        vec3 vLightFront;
                        vec3 vIndirectFront;
                        vec3 objectNormal = mix(normal, normalSphere, delta);
                        #include <defaultnormal_vertex>
                        #include <begin_vertex>
                        #include <project_vertex>
                        #include <lights_lambert_vertex>
                        vLightIntensity = vLightFront + ambientLightColor;
                    `
                    : ""
                }
                
                vec3 pos = mix(position, normalSphere * u_radius, delta);
                gl_Position = projectionMatrix * modelViewMatrix
                    * vec4(pos, 1.0);
            }
        `,
      fragmentShader: `
            ${lights ? "varying vec3 vLightIntensity;" : ""}
            uniform vec3 u_color;
            void main() {
                gl_FragColor = vec4(${
                  lights ? "vLightIntensity * 0.5 * " : ""
                }u_color, 1.0);
            }
        `,
    };
  }

  public get r() {
    return this.mat.uniforms.u_color.value.r;
  }

  public set r(val: number) {
    if (val > 1) this.mat.uniforms.u_color.value.r = 1;
    else if (val < 0) this.mat.uniforms.u_color.value.r = 0;
    else this.mat.uniforms.u_color.value.r = val;
  }

  public get g() {
    return this.mat.uniforms.u_color.value.g;
  }

  public set g(val: number) {
    if (val > 1) this.mat.uniforms.u_color.value.g = 1;
    else if (val < 0) this.mat.uniforms.u_color.value.g = 0;
    else this.mat.uniforms.u_color.value.g = val;
  }

  public get b() {
    return this.mat.uniforms.u_color.value.b;
  }

  public set b(val: number) {
    if (val > 1) this.mat.uniforms.u_color.value.b = 1;
    else if (val < 0) this.mat.uniforms.u_color.value.b = 0;
    else this.mat.uniforms.u_color.value.b = val;
  }

  public get scene() {
    return this.mesh;
  }
}
