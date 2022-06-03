import * as THREE from "three";

export class Chapter16 {
  private geo = new THREE.CircleGeometry(1, 100);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  public get scene() {
    return this.mesh;
  }
}
