import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter18 {
  private haldWidth = 5;
  private clock = new THREE.Clock();
  private geo = new THREE.PlaneGeometry(this.haldWidth, this.haldWidth);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      u_halWidth: { value: this.haldWidth },
      u_time: { value: 0 },
      // u_time: { value: this.clock.getElapsedTime() },
      u_tex: {
        value: new THREE.TextureLoader().load("flame.png"),
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
