export interface RootState {
  key: KeyState;
  canvas: CanvasState;
  chapter: ChapterState;
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

export interface CanvasState {}

export interface ChapterState {
  chapter: Chapter;
}

export type Chapter = 1 | 2;

export interface RGB {
  r: number;
  g: number;
  b: number;
}
