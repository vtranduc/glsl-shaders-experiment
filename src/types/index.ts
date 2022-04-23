export interface RootState {
  key: KeyPress;
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

export interface KeyPress {
  key: Record<Key, boolean>;
}
