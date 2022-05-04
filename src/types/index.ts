import { CSSProperties } from "react";

export interface RootState {
  key: KeyState;
  canvas: CanvasState;
  chapter: ChapterState;
  mouse: MouseState;
  dragAndDrop: DragAndDropState;
}

export enum Key {
  J = "KeyJ",
  K = "KeyK",
  L = "KeyL",
  U = "KeyU",
  I = "KeyI",
  O = "KeyO",
  P = "KeyP",
  R = "KeyR",
  W = "KeyW",
  D = "KeyD",
  S = "KeyS",
  A = "KeyA",
  M = "KeyM",
}

export enum Numpad {
  Numpad0 = "Numpad0",
  Numpad1 = "Numpad1",
  Numpad2 = "Numpad2",
  Numpad3 = "Numpad3",
  Numpad4 = "Numpad4",
  Numpad5 = "Numpad5",
  Numpad6 = "Numpad6",
  Numpad7 = "Numpad7",
  Numpad8 = "Numpad8",
  Numpad9 = "Numpad9",
}

export enum Arrow {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}

export enum Special {
  Space = "Space",
  Enter = "Enter",
  ControlRight = "ControlRight",
  ControlLeft = "ControlLeft",
  BracketRight = "BracketRight",
  BracketLeft = "BracketLeft",
  Quote = "Quote",
  Semicolon = "Semicolon",
  Slash = "Slash",
  Period = "Period",
}

export type Press = Key | Arrow | Special | Numpad;

export const presses = (Object.values(Key) as Press[])
  .concat(Object.values(Arrow))
  .concat(Object.values(Special))
  .concat(Object.values(Numpad));

export type KeyState = Record<Press, boolean>;

export interface CanvasState {
  dimensions: ElementDimensions | null;
}

export interface ChapterState {
  chapter: Chapter;
}

export type Chapter =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ElementDimensions {
  height: number;
  width: number;
  top: number;
  left: number;
}

export interface MouseState {
  position: MousePosition;
}

export enum ImageEXT {
  JPG = "jpg",
  PNG = "png",
  JPEG = "jpeg",
  WEBP = "webp",
}

export type EXT = ImageEXT;

export interface FileData {
  blob: string;
  ext: ImageEXT;
}

export interface DragAndDropState {
  enabled: boolean;
  files: FileData[];
}

export type MousePosition = [number, number];

export type XY = {
  x: number;
  y: number;
};

type Children = React.ReactChild | React.ReactChild[] | null;

export interface ContainerProps {
  children?: Children;
  style?: CSSProperties;
}
