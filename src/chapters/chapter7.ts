import * as THREE from "three";

enum FragmentShaderCircleType {
  Position = "Position",
  UV = "UV",
}

export class Chapter7 {
  private mode = FragmentShaderCircleType.Position;
  private util = { vector3: new THREE.Vector3() };
  private geo = new THREE.PlaneGeometry(2, 2);
  private mat = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 v_position;
        varying vec2 v_uv;
        void main() {
            v_position = position;
            v_uv = uv;

            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(position, 1.0);
        }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.updateFragmentShader();
  }

  public switchMode() {
    this.mode =
      this.mode === FragmentShaderCircleType.Position
        ? FragmentShaderCircleType.UV
        : FragmentShaderCircleType.Position;
    this.updateFragmentShader();
  }

  private updateFragmentShader() {
    this.mat.fragmentShader = `
        varying vec3 v_position;
        varying vec2 v_uv;

        void main() {
            float isInside = step(0.5,  length(v_${
              this.mode === FragmentShaderCircleType.Position
                ? "position"
                : "uv"
            }.xy));

            gl_FragColor = vec4(isInside, 1.0, 0.0, 1.0);
        }
      `;
    this.mat.needsUpdate = true;
  }

  public get xGeometry() {
    return this.geometryCenter.x;
  }

  public set xGeometry(val: number) {
    this.geo.translate(val - this.xGeometry, 0, 0);
  }

  public get yGeometry() {
    return this.geometryCenter.y;
  }

  public set yGeometry(val: number) {
    this.geo.translate(0, val - this.yGeometry, 0);
  }

  private get geometryCenter() {
    this.geo.computeBoundingBox();
    this.geo.boundingBox!.getCenter(this.util.vector3);
    const { x, y } = this.util.vector3;
    return { x, y };
  }

  public get x() {
    return this.mesh.position.x;
  }

  public set x(val: number) {
    this.mesh.position.x = val;
  }

  public get y() {
    return this.mesh.position.y;
  }

  public set y(val: number) {
    this.mesh.position.y = val;
  }

  public get scene() {
    return this.mesh;
  }
}
