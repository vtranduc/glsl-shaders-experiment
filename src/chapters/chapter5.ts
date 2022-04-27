import * as THREE from "three";
import { XY } from "../types";

export class Chapter5 {
  private size_ = 20;
  private geo = new THREE.PlaneGeometry(this.size_, this.size_);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_resolution: {
        value: { x: 1, y: 1 },
      },
    },
    fragmentShader: `
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec3 color = mix(
            vec3(1.0, 0.0, 0.0),
            vec3(0.0, 0.0, 1.0),
            uv.y
        );

        gl_FragColor = vec4(color, 1.0);
      }
      `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  public updateResolution(xy: XY) {
    this.mat.uniforms.u_resolution.value = xy;
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
