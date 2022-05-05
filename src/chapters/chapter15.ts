import * as THREE from "three";

export class Chapter15 {
  private geo = new THREE.CircleGeometry(1, 100);
  private mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      u_distance: { value: 10 },
      u_fadingStart: { value: 0.7 },

      u_majorSpacing: { value: 5.0 },
      u_majorThickness: { value: 0.3 },
      u_majorColor: { value: { r: 1, g: 0, b: 0 } },

      u_minorSpacing: { value: 1.0 },
      u_minorThickness: { value: 0.2 },
      u_minorColor: { value: { r: 0, g: 1, b: 0 } },

      u_xyThickness: { value: 0.5 },
      u_xyColor: { value: { r: 0, g: 0, b: 1 } },
    },
    vertexShader: `
        varying vec2 v_worldPosition;
        varying float v_relativeDistance;

        uniform float u_distance;
        
        void main() {
            v_worldPosition = position.xy * u_distance + cameraPosition.xz;
            v_relativeDistance = length(position.xy);
            gl_Position = projectionMatrix * modelViewMatrix
                * vec4(v_worldPosition.x, 0.0, v_worldPosition.y, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 v_worldPosition;
        varying float v_relativeDistance;

        uniform float u_fadingStart;

        uniform float u_majorSpacing;
        uniform float u_majorThickness;
        uniform vec3 u_majorColor;

        uniform float u_minorSpacing;
        uniform float u_minorThickness;
        uniform vec3 u_minorColor;

        uniform float u_xyThickness;
        uniform vec3 u_xyColor;

        bool getGrid(vec2 point, float width, float spacing) {
            float halfWidth = width / 2.0;
            float lowerLimit = spacing - halfWidth;
            float xMod = mod(point.x, spacing);
            if (xMod >= lowerLimit || xMod <= halfWidth) return true;
            float yMod = mod(point.y, spacing);
            if (yMod >= lowerLimit || yMod <= halfWidth) return true;
            return false;
        }

        bool getGrid(vec2 point, float width) {
            float halfWidth = width / 2.0;
            if (point.x >= -halfWidth && point.x <= halfWidth) return true;
            if (point.y >= -halfWidth && point.y <= halfWidth) return true;
            return false;
        }

        float getAlpha() {
            return smoothstep(1.0, u_fadingStart, v_relativeDistance);
        }

        void main() {
            if (getGrid(v_worldPosition, u_xyThickness)) gl_FragColor = vec4(u_xyColor, getAlpha());
            else if (getGrid(v_worldPosition, u_majorThickness, u_majorSpacing)) gl_FragColor = vec4(u_majorColor, getAlpha());
            else if (getGrid(v_worldPosition, u_minorThickness, u_minorSpacing)) gl_FragColor = vec4(u_minorColor, getAlpha());
            else discard;
        }
    `,
  });
  private mesh = new THREE.Mesh(this.geo, this.mat);

  constructor() {
    this.mesh.frustumCulled = false;
  }

  public get scene() {
    return this.mesh;
  }
}
