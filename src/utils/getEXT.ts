import { ImageEXT, EXT } from "../types";

export function getEXT(name: string): EXT | null {
  const lastDot = name.lastIndexOf(".");
  if (lastDot === -1) return null;
  const ext = name.substring(lastDot + 1).toLowerCase();
  switch (ext) {
    case "png":
      return ImageEXT.PNG;
    case "jpg":
      return ImageEXT.JPG;
    case "jpeg":
      return ImageEXT.JPEG;
    case "webp":
      return ImageEXT.WEBP;
    default:
      return null;
  }
}
