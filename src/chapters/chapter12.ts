import * as THREE from "three";

export class Chapter12 {
  private loader = new THREE.TextureLoader();
  private geo = new THREE.PlaneGeometry(20, 20);
  private defaultMat = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    shininess: 50,
  });
  private mesh: THREE.Mesh = new THREE.Mesh(this.geo, this.defaultMat);

  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      u_texture: {
        value: new THREE.Texture(),
      },
      u_uvScale: { value: { x: 1, y: 1 } },
      u_theta: { value: 0 },
      u_flip: { value: { x: 1, y: 1 } },
    },
    vertexShader: `
      varying vec2 v_uv;
      void main() {
          v_uv = uv;
          gl_Position = projectionMatrix * modelViewMatrix
              * vec4(position, 1.0);
      }
    `,
    fragmentShader: this.getFragmentShader(),
  });

  constructor() {
    this.loader.load("piqturdrophere.jpg", (texture) => {
      this.defaultMat.map = this.crop(texture);
      this.defaultMat.needsUpdate = true;
    });

    this.loader.load(
      "tkg9ixbB9FxPyw.jpg",
      (texture) => (this.texture = this.crop(texture))
    );
  }

  private getFragmentShader(rgb = "rgb") {
    return `
      #define Pi 3.1415926535897932384626433832795
      uniform sampler2D u_texture;
      uniform vec2 u_uvScale;
      uniform float u_theta;
      uniform vec2 u_flip;
      varying vec2 v_uv;

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

      mat2 getRotationMat(float theta) {
        float s = sin(theta);
        float c = cos(theta);
        return mat2(c, s, -s, c);
      }

      float inRect(vec2 point, vec2 dims, vec2 center, float theta) {
        vec2 halfDims = dims / 2.0;
        mat2 rotationMat = getRotationMat(theta);
        vec2 xRotated = rotationMat * vec2(1.0, 0.0);
        vec2 yRotated = rotationMat * vec2(0.0, 1.0);
        vec2 adjustedPoint = point - center;
        float xDot = abs(dot(adjustedPoint, xRotated));
        float yDot = abs(dot(adjustedPoint, yRotated));
        return step(xDot, halfDims.x) * step(yDot, halfDims.y);
      }

      void main() {
        float theta = u_theta;
        mat3 rotationMat = getRotationMat(-theta * u_flip.x * u_flip.y, vec2(0.5, 0.5));
        vec2 flippedUv = (v_uv - vec2(0.5, 0.5)) * u_flip + vec2(0.5, 0.5);
        vec2 rotatedUv = (rotationMat * vec3(flippedUv, 1.)).xy;
        vec2 mappedUV = rotatedUv * u_uvScale + 0.5 * (vec2(1.0) - u_uvScale);
        vec3 color = inRect(v_uv, vec2(1., 1.), vec2(0.5, 0.5), theta) * texture2D(
          u_texture,
          mappedUV
        ).${rgb};
        gl_FragColor = vec4(color, 1.0);
      }
    `;
  }

  private crop(texture: THREE.Texture) {
    const { height, width } = texture.image;
    if (width > height) {
      texture.repeat.x = height / width;
      texture.offset.x = (width - height) / (2 * width);
    } else {
      texture.repeat.y = width / height;
      texture.offset.y = (height - width) / (2 * height);
    }
    return texture;
  }

  private set texture(texture: THREE.Texture) {
    const { width, height } = texture.image;
    this.mat.uniforms.u_uvScale.value =
      width > height
        ? { x: height / width, y: 1 }
        : { x: 1, y: width / height };
    this.mat.uniforms.u_texture.value = texture;
    this.mesh.material = this.mat;
  }

  public get angle() {
    return this.mat.uniforms.u_theta.value;
  }

  public set angle(val: number) {
    this.mat.uniforms.u_theta.value = val % (2 * Math.PI);
  }

  public get xFlip() {
    return this.mat.uniforms.u_flip.value.x === -1;
  }

  public set xFlip(flip: boolean) {
    this.mat.uniforms.u_flip.value.x = flip ? -1 : 1;
  }

  public get yFlip() {
    return this.mat.uniforms.u_flip.value.y === -1;
  }

  public set yFlip(flip: boolean) {
    this.mat.uniforms.u_flip.value.y = flip ? -1 : 1;
  }

  public set rgb(rgb: string) {
    if (rgb.length !== 3) return;
    if (rgb.split("").some((character) => !["r", "g", "b"].includes(character)))
      return;
    this.mat.fragmentShader = this.getFragmentShader(rgb);
    this.mat.needsUpdate = true;
  }

  public set image(blob: string) {
    this.loader.load(
      blob,
      (texture) => (this.mat.uniforms.u_texture.value = texture)
    );
  }

  public get scene() {
    return this.mesh;
  }
}
