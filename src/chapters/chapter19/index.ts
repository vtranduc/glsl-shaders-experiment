import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter19 {
  private geo = new THREE.TorusKnotGeometry(1, 0.5, 100, 16);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
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

  public get scene() {
    return this.mesh;
  }
}
