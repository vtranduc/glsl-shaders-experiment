import * as THREE from "three";

export class Chapter14 {
  private mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 v_worldPosition;
        varying vec2 v_localPosition;

        void main() {
            vec2 pos = position.xy + cameraPosition.xy;
            v_worldPosition = pos;
            v_localPosition = position.xy;
            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(pos, position.z, 1.0);
        }
    `,
      fragmentShader: `
        varying vec2 v_worldPosition;
        varying vec2 v_localPosition;

        void main() {
            float width = 0.2;
            float radius = 2.0;

            float halfWidth = width / 2.0;
            float xLine = step(-halfWidth, v_worldPosition.x) - step(halfWidth, v_worldPosition.x);
            float yLine = step(-halfWidth, v_worldPosition.y) - step(halfWidth, v_worldPosition.y);
            float r = min(xLine + yLine, 1.0);
            float g = step(length(v_localPosition), radius);
            vec3 color = vec3(r, g, 0.0);
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    })
  );

  public get scene() {
    return this.mesh;
  }
}
