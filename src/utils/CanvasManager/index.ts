import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Preset, StandardPreset } from "./presets";
import { ElementDimensions, MousePosition } from "../../types";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

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
    this.resetCamera();
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
    this.resetCamera();
    this.scene.background = null;
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

  public intersectObject(
    object: THREE.Object3D,
    mouse: MousePosition
  ): THREE.Intersection<THREE.Object3D<THREE.Event>> | null {
    this.raycaster.setFromCamera(
      this.utils.vector2.fromArray(mouse),
      this.camera
    );
    return this.raycaster.intersectObject(object)[0] || null;
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

  private resetCamera() {
    this.setCameraPosition(0, 5, 5);
    this.lookAt(0, 0, 0);
  }

  public setCameraPosition(x: number, y: number, z: number) {
    this.camera.position.set(x, y, z);
  }

  public lookAt(x: number, y: number, z: number) {
    this.camera.lookAt(x, y, z);
  }

  public setBackground(background: THREE.CubeTexture) {
    this.scene.background = background;
  }

  public blur() {
    console.log("show this~");

    const composer = new EffectComposer(this.renderer);

    composer.addPass(new RenderPass(this.scene, this.camera));

    const glslPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        resolution: {
          value: new THREE.Vector2(
            window.innerWidth,
            window.innerHeight
          ).multiplyScalar(window.devicePixelRatio),
        },
        blurSize: { value: 20.0 },
      },
      vertexShader: `
        varying vec2 v_uv;
      
        void main() {
          v_uv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform float blurSize;
    
        varying vec2 v_uv;
    
        vec4 blur(sampler2D tex){
          const float PI2 = 6.28318530718; // Pi*2
        
          // BLUR SETTINGS {{{
          const float directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
          const float quality = 3.0; // BLUR QUALITY (Default 3.0 - More is better but slower)
          // BLUR SETTINGS }}}
      
          vec2 radius = blurSize/resolution;
        
          // Normalized pixel coordinates (from 0 to 1)
          vec2 uv = gl_FragCoord.xy/resolution;
          // Pixel colour
          vec4 color = texture2D(tex, uv);
        
          // Blur calculations
          int count = 1;
          for( float theta=0.0; theta<PI2; theta+=PI2/directions)
          {
            vec2 dir = vec2(cos(theta), sin(theta)) * radius;
            for(float i=1.0/quality; i<=1.0; i+=1.0/quality)
            {
              color += texture2D( tex, uv+dir*i);	
              count++;
            }
          }
        
          color /= float(count);
          
          return color;
        }
        
        void main (void)
        {
          gl_FragColor = blur(tDiffuse); 
        }
      `,
    });

    glslPass.renderToScreen = true;
    composer.addPass(glslPass);

    composer.setSize(window.innerWidth, window.innerHeight);

    glslPass.uniforms.resolution.value
      .set(window.innerWidth, window.innerHeight)
      .multiplyScalar(window.devicePixelRatio);
  }
}
