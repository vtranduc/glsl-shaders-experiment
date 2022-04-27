import * as THREE from "three";

type RectangleIdentifier = 0 | 1 | 2;

export class Chapter8 {
  private rect: RectangleIdentifier = 0;
  private geo = new THREE.PlaneGeometry(20, 20);
  private mat = new THREE.ShaderMaterial({
    uniforms: {
      u_size1: { value: { x: 0.5, y: 0.8 } },
      u_center1: { value: { x: 0, y: 0.5 } },
      u_size2: { value: { x: 1, y: 0.8 } },
      u_center2: { value: { x: -0.5, y: 0 } },
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

        float isRect(vec2 position, vec2 size, vec2 center) {
            vec2 halfSize = size / 2.0;
            vec2 isInside = step(center - halfSize, position)
                - step(center + halfSize, position);
            return isInside.x * isInside.y;
        }

        void main() {
            float r = isRect(v_position.xy, u_size1, u_center1);
            float g = isRect(v_position.xy, u_size2, u_center2);
            float b = isRect(v_position.xy, u_size3, u_center3);
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

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

  public get scene() {
    return this.mesh;
  }
}
