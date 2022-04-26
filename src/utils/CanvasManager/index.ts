import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Preset, StandardPreset } from "./presets";
import { ElementDimensions, MousePosition } from "../../types";

interface RequestedAnimation {
  id: number;
  animation: (timestamp?: number) => void;
}

export class CanvasManager {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  private renderer = new THREE.WebGLRenderer();
  private controls = new OrbitControls(this.camera, this.renderer.domElement);
  private preset: Preset;
  private requestedAnimations: RequestedAnimation[] = [];
  private animationId = 0;
  private div: HTMLDivElement | null = null;
  private raycaster = new THREE.Raycaster();
  private utils = {
    vector2: new THREE.Vector2(),
  };

  constructor() {
    this.preset = new StandardPreset();
    this.designateIsPreset(this.preset.preset);
    this.scene.add(this.preset.preset);
    this.camera.position.set(0, 5, 5);
    this.renderer.setClearColor(0xf0f5f5);
    this.renderer.shadowMap.enabled = true;
    this.controls.update();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private animate(timestamp = 0) {
    requestAnimationFrame(this.animate);
    this.preset.animate();
    this.requestedAnimations.forEach((animation) =>
      animation.animation(timestamp)
    );
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  private designateIsPreset(object: THREE.Object3D) {
    object.userData.isPreset = true;
  }

  private isPreset(object: THREE.Object3D) {
    return !!object.userData.isPreset;
  }

  public appendToDiv(div: HTMLDivElement, fit = true) {
    this.div = div;
    div.appendChild(this.renderer.domElement);
    if (fit) this.fitToDiv();
  }

  public removeFromDiv() {
    this.div?.removeChild(this.renderer.domElement);
  }

  public fitToDiv() {
    if (!this.div) return;
    const width = this.div.clientWidth;
    const height = this.div.clientHeight;
    const aspect = width / height;
    this.renderer.setSize(width, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  public add(object: THREE.Object3D) {
    this.scene.add(object);
  }

  public remove(object: THREE.Object3D) {
    this.scene.remove(object);
  }

  public clear() {
    this.scene.children
      .filter((object) => !this.isPreset(object))
      .forEach((object) => this.remove(object));
    this.clearAnimations();
  }

  public get dimensions(): ElementDimensions | null {
    return (
      this.div && {
        top: this.renderer.domElement.offsetTop,
        left: this.renderer.domElement.offsetLeft,
        width: this.renderer.domElement.clientWidth,
        height: this.renderer.domElement.clientHeight,
      }
    );
  }

  public intersectObject(object: THREE.Object3D, mouse: MousePosition) {
    this.raycaster.setFromCamera(
      this.utils.vector2.fromArray(mouse),
      this.camera
    );
    return this.raycaster.intersectObject(object);
  }

  public requestAnimation(animation: (timestamp?: number) => void) {
    this.animationId++;
    this.requestedAnimations.push({ id: this.animationId, animation });
    return this.animationId;
  }

  public cancelAnimation(id: number) {
    this.requestedAnimations = this.requestedAnimations.filter(
      (animation) => animation.id !== id
    );
  }

  public clearAnimations() {
    this.requestedAnimations = [];
  }
}
