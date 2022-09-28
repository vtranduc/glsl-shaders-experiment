import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";

export class Chapter20 {
  private torusKnot = new THREE.TorusKnotGeometry(1, 0.5, 100, 16);
  private sphere = new THREE.SphereGeometry(5, 30, 30);
  private box = new THREE.BoxGeometry(5, 5, 5);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
  });
  private mesh = new THREE.Mesh<
    THREE.BoxGeometry | THREE.TorusKnotGeometry | THREE.SphereGeometry
  >(this.torusKnot, this.mat);
  private onCubeTextureLoaded: (cubeTexture: THREE.CubeTexture) => void;

  constructor(onCubeTextureLoaded: (cubeTexture: THREE.CubeTexture) => void) {
    this.mesh.visible = false;
    this.onCubeTextureLoaded = onCubeTextureLoaded;
    this.init().finally(() => (this.mesh.visible = true));
  }

  private async init() {
    const loader = new THREE.CubeTextureLoader();
    const background = loader
      .setPath("galaxy/")
      .load(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]);

    this.onCubeTextureLoaded(background);

    this.mat.uniforms = {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib["common"],
        THREE.UniformsLib["lights"],
      ]),
      u_samplerCube: { value: background },
    };

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

  public setGeometry(shape: number) {
    switch (shape) {
      case 0:
        this.mesh.geometry = this.torusKnot;
        break;
      case 1:
        this.mesh.geometry = this.sphere;
        break;
      case 2:
        this.mesh.geometry = this.box;
        break;
      default:
    }
  }
}
