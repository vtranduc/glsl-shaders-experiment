import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter17 {
  private dimensions = { height: 2, width: 2 };
  private clock = new THREE.Clock();
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      u_time: { value: this.clock.getElapsedTime() },
      u_resolution: {
        value: { x: this.dimensions.width, y: this.dimensions.height },
      },
      u_tex: {
        value: new THREE.TextureLoader().load(
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/flame.png"
        ),
      },
    },
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.updateOnAnimationFrame = this.updateOnAnimationFrame.bind(this);
    this.mesh.visible = false;
    this.init().finally(() => (this.mesh.visible = true));
  }

  private async init() {
    const vertexShaderResponse = await fetch(vertexShaderMedia);
    const vertexShader = await vertexShaderResponse.text();
    const fragmentShaderResponse = await fetch(fragmentShaderMedia);
    const fragmentShader = await fragmentShaderResponse.text();
    this.mat.vertexShader = vertexShader;
    this.mat.fragmentShader = fragmentShader;
    this.mat.needsUpdate = true;
  }

  public updateOnAnimationFrame() {
    this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get scene() {
    return this.mesh;
  }
}
