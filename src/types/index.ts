export interface RootState {
  key: KeyState;
  canvas: CanvasState;
  chapter: ChapterState;
  mouse: MouseState;
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
}

export type Press = Key | Arrow | Special;

export type KeyState = Record<Press, boolean>;

export interface CanvasState {
  dimensions: ElementDimensions | null;
}

export interface ChapterState {
  chapter: Chapter;
}

export type Chapter = 1 | 2 | 3 | 4 | 5 | 6;

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

export type MousePosition = [number, number];

export type XY = {
  x: number;
  y: number;
};
