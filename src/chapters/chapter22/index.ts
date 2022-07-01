import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter22 {
  private clock = new THREE.Clock();
  private haldWidth = 10;
  private faces = this.getFaces();
  private faceIndex = 0;
  private geo = new THREE.PlaneGeometry(this.haldWidth, this.haldWidth);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_halWidth: { value: this.haldWidth },
      u_time: { value: 0 },
      u_texture: { value: this.faces[this.faceIndex] },
      u_duration: { value: 0.8 },
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
  }

  private getFaces() {
    const loader = new THREE.TextureLoader();
    let faces = [];
    for (let i = 0; i < 6; i++) faces.push(loader.load(`galaxy/${i + 1}.jpg`));
    return faces;
  }

  public switch() {
    this.faceIndex = (this.faceIndex + 1) % 6;
    this.mat.uniforms.u_texture.value = this.faces[this.faceIndex];
  }

  public updateOnAnimationFrame() {
    this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get scene() {
    return this.mesh;
  }
}
