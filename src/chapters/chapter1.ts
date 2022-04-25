import * as THREE from "three";
import { RGB } from "../types";

export class Chapter1 {
  private group = new THREE.Group();
  private mat = new THREE.ShaderMaterial();
  private vertexShaderSize = 1;
  private fragmentShaderOpacity = 1;
  private colorIndex = 0;
  private colors: RGB[] = [
    { r: 1, g: 0, b: 0 },
    { r: 0, g: 1, b: 0 },
    { r: 0, g: 0, b: 1 },
  ];

  constructor() {
    const geo = new THREE.PlaneGeometry(2, 2);
    this.updateVertexShader();
    this.updateFragmentShader();
    const mesh = new THREE.Mesh(geo, this.mat);
    this.group.add(mesh);
  }

  public get size() {
    return this.vertexShaderSize;
  }

  public set size(val: number) {
    if (val < 1) return;
    this.vertexShaderSize = val;
    this.updateVertexShader();
  }

  public get opacity() {
    return this.fragmentShaderOpacity;
  }

  public set opacity(val: number) {
    if (val > 1 || val < 0) return;
    this.fragmentShaderOpacity = val;
    this.updateFragmentShader();
  }

  public switchColor() {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.updateFragmentShader();
  }

  private updateVertexShader() {
    const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix
          * vec4(position * float(${this.vertexShaderSize}), 1.0);
    }
    `;
    this.mat.vertexShader = vertexShader;
    this.mat.needsUpdate = true;
  }

  private updateFragmentShader() {
    const { r, g, b } = this.colors[this.colorIndex];
    const fragmentShader = `
    void main() {
        gl_FragColor = vec4(float(${r}), float(${g}), float(${b}),
          float(${this.fragmentShaderOpacity}));
    }
    `;
    this.mat.fragmentShader = fragmentShader;
    this.mat.needsUpdate = true;
  }

  get scene() {
    return this.group;
  }
}
