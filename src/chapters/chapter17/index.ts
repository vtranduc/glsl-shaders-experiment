import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter17 {
  private clock = new THREE.Clock();
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      u_time: { value: this.clock.getElapsedTime() },
      u_layer: { value: 0 },
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

  public changeLayer() {
    this.mat.uniforms.u_layer.value = (this.mat.uniforms.u_layer.value + 1) % 4;
  }
}
