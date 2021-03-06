import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter16 {
  private clock = new THREE.Clock();
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      u_time: { value: this.clock.getElapsedTime() },
      u_morgan3d: { value: false },
      u_morgan3dLevel: { value: 8 },
    },
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);
  public animate = true;

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
    if (this.animate)
      this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get scene() {
    return this.mesh;
  }

  public get morgan3d() {
    return this.mat.uniforms.u_morgan3d.value;
  }

  public set morgan3d(morgan3d: boolean) {
    this.mat.uniforms.u_morgan3d.value = morgan3d;
  }

  public get morgan3dLevel() {
    return this.mat.uniforms.u_morgan3dLevel.value;
  }

  public set morgan3dLevel(level: number) {
    if (level < 0) return;
    this.mat.uniforms.u_morgan3dLevel.value = level;
  }
}
