import * as THREE from "three";

type RectangleIdentifier = 0 | 1 | 2;

export class Chapter8 {
  private rect: RectangleIdentifier = 0;
  private clock = new THREE.Clock(false);
  private geo = new THREE.PlaneGeometry(20, 20);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_rotate: { value: false },
      u_rotationMode: { value: 0 },
      u_anchor: { value: { x: 2, y: 0 } },
      u_time: { value: 0 },
      u_size1: { value: { x: 0.5, y: 0.8 } },
      u_center1: { value: { x: 0.5, y: 0.5 } },
      u_size2: { value: { x: 1, y: 0.8 } },
      u_center2: { value: { x: 0, y: 0 } },
      u_size3: { value: { x: 1, y: 0.8 } },
      u_center3: { value: { x: 3, y: 0 } },
    },
    vertexShader: `
        varying vec3 v_position;
        void main() {
            v_position = position;
            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 v_position;
        uniform vec2 u_size1;
        uniform vec2 u_center1;
        uniform vec2 u_size2;
        uniform vec2 u_center2;
        uniform vec2 u_size3;
        uniform vec2 u_center3;
        uniform float u_time;
        uniform bool u_rotate;
        uniform int u_rotationMode;
        uniform vec2 u_anchor;

        float isRect(vec2 position, vec2 size, vec2 center) {
            vec2 halfSize = size / 2.0;
            vec2 isInside = step(center - halfSize, position)
                - step(center + halfSize, position);
          return isInside.x * isInside.y;
        }

        mat2 getRotationMat(float theta) {
          float s = sin(theta);
          float c = cos(theta);
          return mat2(c, s, -s, c);
        }

        mat3 getRotationMat(float theta, vec2 translate) {
          float s = sin(theta);
          float c = cos(theta);

          float x = translate.x;
          float y = translate.y;

          return mat3(
            c, s, 0,
            -s, c, 0,
            x - c * x + s * y, y - s * x - c * y, 1
          );
        }

        void main() {

          vec2 positions[3];
          vec2 centers[3] = vec2[](u_center1, u_center2, u_center3);
          vec2 sizes[3] = vec2[](u_size1, u_size2, u_size3);

          if (u_rotate) {
          
            switch(u_rotationMode) {
              case 0:
                vec2 adjustment = vec2(cos(u_time), sin(u_time));
                for (int i = 0; i < 3; i++) positions[i] = v_position.xy + adjustment;
                break;
              case 1:
                for (int i = 0; i < 3; i++) positions[i] = getRotationMat(u_time) * v_position.xy;
                break;
              case 2:
                for (int i = 0; i < 3; i++) positions[i] = 
                  (getRotationMat(u_time, u_anchor) * vec3(v_position.xy, 1.0)).xy;
                break;
              default:
                break;
            }
          } else for (int i = 0; i < 3; i++) positions[i] = v_position.xy;

          vec3 rgb;
          for (int i = 0; i < 3; i++) rgb[i] = isRect(positions[i], sizes[i], centers[i]);

          gl_FragColor = vec4(rgb, 1.0);
        }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.updateOnAnimationFrame = this.updateOnAnimationFrame.bind(this);
  }

  public get x() {
    return this.uniformsPosition.x;
  }

  public set x(val: number) {
    this.uniformsPosition.x = val;
  }

  public get y() {
    return this.uniformsPosition.y;
  }

  public set y(val: number) {
    this.uniformsPosition.y = val;
  }

  public get xSize() {
    return this.uniformsSize.x;
  }

  public set xSize(val: number) {
    if (val < 0) return;
    this.uniformsSize.x = val;
  }

  public get ySize() {
    return this.uniformsSize.y;
  }

  public set ySize(val: number) {
    if (val < 0) return;
    this.uniformsSize.y = val;
  }

  private get uniformsPosition() {
    switch (this.rect) {
      case 1:
        return this.mat.uniforms.u_center2.value;
      case 2:
        return this.mat.uniforms.u_center3.value;
      case 0:
      default:
        return this.mat.uniforms.u_center1.value;
    }
  }

  private get uniformsSize() {
    switch (this.rect) {
      case 1:
        return this.mat.uniforms.u_size2.value;
      case 2:
        return this.mat.uniforms.u_size3.value;
      case 0:
      default:
        return this.mat.uniforms.u_size1.value;
    }
  }

  public switch() {
    this.rect = (++this.rect % 3) as RectangleIdentifier;
  }

  public get rotate() {
    return this.mat.uniforms.u_rotate.value;
  }

  public set rotate(rotate: boolean) {
    if (rotate === this.rotate) return;
    if (rotate) this.clock.start();
    else this.clock.stop();
    this.mat.uniforms.u_rotate.value = rotate;
  }

  public switchRotateMode() {
    this.rotateMode = ((this.rotateMode + 1) % 3) as 0 | 1 | 2;
  }

  private get rotateMode() {
    return this.mat.uniforms.u_rotationMode.value;
  }

  private set rotateMode(mode: 0 | 1 | 2) {
    this.mat.uniforms.u_rotationMode.value = mode;
  }

  public updateOnAnimationFrame() {
    if (this.rotate)
      this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  public get scene() {
    return this.mesh;
  }
}
