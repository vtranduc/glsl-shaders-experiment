import { generateRandom } from "../../utils";
import * as THREE from "three";
import { AdaptiveToneMappingPass } from "three/examples/jsm/postprocessing/AdaptiveToneMappingPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { ClearPass } from "three/examples/jsm/postprocessing/ClearPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

class OrbitingBoxes {
  private group = new THREE.Group();

  constructor() {
    this.updateOnAnimationFrame = this.updateOnAnimationFrame.bind(this);

    const range = 20;
    const getRandomPos = () =>
      [...Array(3)].map(() => generateRandom(-range, range));

    for (let i = 0; i < 150; i++) {
      const box = this.createBox();
      box.position.fromArray(getRandomPos());
      box.material.color.setRGB(Math.random(), Math.random(), Math.random());
      const scale = generateRandom(0.1, 1.5);
      box.scale.set(scale, scale, scale);
      this.group.add(box);
    }
  }

  private createBox() {
    const geo = new THREE.BoxGeometry(2, 2, 2);
    const mat = new THREE.MeshPhongMaterial({
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  public updateOnAnimationFrame() {
    this.group.rotation.y += 0.01;
    this.group.rotation.x += 0.015;
  }

  public get scene() {
    return this.group;
  }
}

export class Chapter21 extends OrbitingBoxes {
  private adaptiveToneMapping = new AdaptiveToneMappingPass();
  private afterImage = new AfterimagePass();
  private bloom: UnrealBloomPass;
  private clear = new ClearPass();
  private backgroundTexture = new THREE.CubeTextureLoader()
    .setPath("galaxy/")
    .load(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]);

  constructor(width = window.innerWidth, height = window.innerHeight) {
    super();
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5,
      0.4,
      0.85
    );
  }

  public get adaptiveToneMappingPass() {
    return this.adaptiveToneMapping;
  }

  public get afterImagePass() {
    return this.afterImage;
  }

  public get bloomPass() {
    return this.bloom;
  }

  public get clearPass() {
    return this.clear;
  }

  public get background() {
    return this.backgroundTexture;
  }
}
