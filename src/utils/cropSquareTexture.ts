import * as THREE from "three";

export function cropSquareTexture(texture: THREE.Texture) {
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
