import * as THREE from "three";
import vertexShaderMedia from "./vertexShader.glsl";
import fragmentShaderMedia from "./fragmentShader.glsl";
import { Arrow } from "../../types";

export class Chapter20 {
  private torusKnot = new THREE.TorusKnotBufferGeometry(1, 0.5, 100, 16);
  private sphere = new THREE.SphereGeometry(5, 30, 30);
  private box = new THREE.BoxGeometry(5, 5, 5);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
  });
  private mesh = new THREE.Mesh<
    THREE.BoxGeometry | THREE.TorusKnotBufferGeometry | THREE.SphereGeometry
  >(this.box, this.mat);
  private onCubeTextureLoaded: (cubeTexture: THREE.CubeTexture) => void;

  constructor(onCubeTextureLoaded: (cubeTexture: THREE.CubeTexture) => void) {
    this.mesh.visible = false;
    this.onCubeTextureLoaded = onCubeTextureLoaded;
    this.init().finally(() => (this.mesh.visible = true));
  }

  private async init() {
    const loader = new THREE.CubeTextureLoader();
    const background = loader
      .setPath("sky/")
      .load([
        "skybox_px.jpg",
        "skybox_nx.jpg",
        "skybox_py.jpg",
        "skybox_ny.jpg",
        "skybox_pz.jpg",
        "skybox_nz.jpg",
      ]);

    this.onCubeTextureLoaded(background);

    this.mat.uniforms = {
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

  public handleScaleCommand(dir: Arrow) {
    const increment = 0.2;

    switch (dir) {
      case Arrow.Up:
        this.mesh.scale.z += increment;
        break;
      case Arrow.Down:
        if (this.mesh.scale.z - increment > 0) this.mesh.scale.z -= increment;
        break;
      case Arrow.Right:
        this.mesh.scale.x += increment;
        break;
      case Arrow.Left:
        this.mesh.scale.x -= increment;
        break;
      default:
    }
  }
}
