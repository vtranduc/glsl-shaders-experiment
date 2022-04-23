import * as THREE from "three";
import { Key, KeyPress } from "../types";

abstract class Chapter {
  public abstract get scene(): THREE.Object3D;
}

export class Chapter1 extends Chapter {
  private group = new THREE.Group();
  private mat = new THREE.ShaderMaterial();

  constructor() {
    super();
    const geo = new THREE.PlaneGeometry(2, 2);
    this.updateVertexShader();
    const mesh = new THREE.Mesh(geo, this.mat);
    this.group.add(mesh);
  }

  public onKeyPress({ key }: KeyPress) {
    if (key[Key.J]) this.updateVertexShader(10);
    else this.updateVertexShader(1);
  }

  private updateVertexShader(size = 1) {
    const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position * float(${size}), 1.0);
    }
    `;
    this.mat.vertexShader = vertexShader;
    this.mat.needsUpdate = true;
  }

  get scene() {
    return this.group;
  }
}
