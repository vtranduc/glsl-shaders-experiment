import { CanvasManager } from "../../utils";
import * as THREE from "three";

export function chapter21Saga(controller: CanvasManager) {
  const chapter21 = new Chapter21();
  controller.add(chapter21.scene);
  controller.requestAnimation(chapter21.updateOnAnimationFrame);
  controller.blur();
}

class Chapter21 {
  private box = this.createBox();

  constructor() {
    this.updateOnAnimationFrame = this.updateOnAnimationFrame.bind(this);
  }

  private createBox() {
    const geo = new THREE.BoxGeometry(2, 2, 2);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  public updateOnAnimationFrame() {
    this.box.rotation.y += 0.01;
  }

  public get scene() {
    return this.box;
  }
}
